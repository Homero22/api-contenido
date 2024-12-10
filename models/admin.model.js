
import { DataTypes } from 'sequelize';
import { sequelize } from '../database/postgres.js'; 


export const Admin=  sequelize.define('tb_admin',   
    {
        int_admin_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        str_admin_usuario: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        str_admin_password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
    },
    {
        schema: 'seguridad',
        timestamps: false,
        freezeTableName: true
    }
);