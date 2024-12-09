
import { Usuario } from '../models/usuario.model.js';
import { UsuarioContenido } from '../models/usuario_contenido.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const obtenerUsuarioByCedula = async (req, res) => {
    try {

        const { cedula } = req.query;
        let usuario = await Usuario.findOne({
            where: {
                str_usuario_cedula: cedula,
            },
            include: {
                model: UsuarioContenido,
            },
            
        });
        if (!usuario) {
            return res.json({
                status: false,
                message: 'Usuario no encontrado',
                body: [],
            });
        }

        //recorro tb_usuario_contenidos para detectar si hay una imagen de tipo "entrega" str_usuario_contenido_tipo

        usuario.tb_usuario_contenidos.forEach((imagen) => {
            if (imagen.str_usuario_contenido_tipo === 'entrega') {
                usuario.dataValues.fotoentregado = imagen.str_usuario_contenido_url;
            }
        });
        
        res.json({
            status: true,
            message: 'Usuario encontrado',
            body: usuario,
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración de multer
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads'),
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});

const upload = multer({ storage }).array('imagenes'); // Soporta múltiples imágenes

//crear usuario
const crearUsuario = async (req, res) => {
    try {

        const { str_usuario_nombres, str_usuario_cedula, str_usuario_email, str_usuario_telefono } = req.body;

        const usuario = await Usuario.create({
            str_usuario_nombres,
            str_usuario_cedula,
            str_usuario_email,
            str_usuario_telefono,
        });

        //retornar usuario creado
        if (usuario) {
            res.json({
                status: true,
                message: "Usuario creado correctamente",
                data: usuario,
            });
        } else {
            res.json({
                status: false,
                message: "Error al crear usuario",
            });
        }


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const subirImagenes = async (req, res) => {

    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error al cargar las imágenes', error: err.message });
        }

        try {
            const { id } = req.params;  // Obtener el ID del usuario desde los parámetros de la URL

            // Validar si el usuario existe
            const usuario = await Usuario.findByPk(id);
            if (!usuario) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            // Guardar las imágenes asociadas al usuario en la base de datos
            if (req.files && req.files.length > 0) {

                //si el nombre de la imagen es "entrega" se asigna el tipo de contenido "entrega"


                 
                const imagenes = await Promise.all(req.files.map(async (file) => {
                    let tipoContenido = 'general';
                    if (file.originalname.includes('entrega')) {
                        tipoContenido = 'entrega';

                        await Usuario.update({
                            entregado: true,
                        }, {
                            where: {
                                int_usuario_id: id,
                            },
                        });

                    }
                    return {
                        str_usuario_contenido_tipo: tipoContenido, 
                        str_usuario_contenido_url: `/public/uploads/${file.filename}`, // Ruta relativa al archivo
                        int_usuario_id: id,
                    };
                }));

                await UsuarioContenido.bulkCreate(imagenes);
            }

            res.status(200).json({ message: 'Imágenes cargadas exitosamente' });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al cargar las imágenes', error: error.message });
        }
    });
};



export default {
    obtenerUsuarioByCedula,
    crearUsuario,
    subirImagenes
};