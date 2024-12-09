import { DataTypes } from 'sequelize';
import { sequelize } from '../database/postgres.js';
import { Usuario } from './usuario.model.js';


export const UsuarioContenido=  sequelize.define('tb_usuario_contenido', 
    {
        int_usuario_contenido_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        int_usuario_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Usuario,
                key: 'int_usuario_id'
            }
        },
        str_usuario_contenido_tipo: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        str_usuario_contenido_url: {
            type: DataTypes.STRING(100),
            allowNull: false
        },

    },
    {
        schema: 'public',
        timestamps: false,
        freezeTableName: true
    }
);

//relacion entre usuario y usuario_contenido

Usuario.hasMany(UsuarioContenido, {foreignKey: 'int_usuario_id', sourceKey: 'int_usuario_id'});
UsuarioContenido.belongsTo(Usuario, {foreignKey: 'int_usuario_id', sourceKey: 'int_usuario_id'});

