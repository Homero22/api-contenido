import {Admin} from '../models/admin.model.js';

import bcrypt from 'bcrypt';



const login = async (req, res) => {
    try {
        const { usuario, password } = req.body;

        // Buscar al usuario en la base de datos
        let admin = await Admin.findOne({
            where: {
                str_admin_usuario: usuario
            }
        });

        if (!admin) {
            return res.json({
                status: false,
                message: 'Usuario o contraseña incorrectos'
            });
        }

        // Comparar la contraseña ingresada con la almacenada
        const passwordMatch = await bcrypt.compare(password, admin.str_admin_password);
        if (!passwordMatch) {
            return res.json({
                status: false,
                message: 'Usuario o contraseña incorrectos'
            });
        }

        // Si todo es correcto, enviar respuesta de éxito
        res.json({
            status: true,
            message: 'Bienvenido'
        });
    } catch (error) {
        console.error(error);
        res.json({
            status: false,
            message: 'Error en el servidor'
        });
    }
};


const crearAdmin = async (req, res) => {
    try {
        const { usuario, password } = req.body;

        // Verificar que los campos no estén vacíos
        if (!usuario || !password) {
            return res.json({
                status: false,
                message: 'Usuario y contraseña son obligatorios'
            });
        }

        // Encriptar la contraseña
        const saltRounds = 10; // Nivel de complejidad del hash
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Crear el admin con la contraseña encriptada
        let admin = await Admin.create({
            str_admin_usuario: usuario,
            str_admin_password: hashedPassword
        });

        if (!admin) {
            return res.json({
                status: false,
                message: 'No se pudo crear el usuario'
            });
        }

        res.json({
            status: true,
            message: 'Usuario creado correctamente'
        });
    } catch (error) {
        console.error(error);
        res.json({
            status: false,
            message: 'Error en el servidor'
        });
    }
};

export default { login, crearAdmin };

//query para agregar un usuario
//INSERT INTO seguridad.tb_admin(str_admin_usuario, str_admin_password) VALUES ('admin', 'admin');