
import { DataTypes } from 'sequelize';
import { sequelize } from '../database/postgres.js'; 


export const Imagenes=  sequelize.define('tb_imagenes',

    {
        int_imagen_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        str_imagen_url: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
       
    },
    {
        schema: 'public',
        timestamps: false,
        freezeTableName: true
    }
);