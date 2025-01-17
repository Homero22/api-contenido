
import { DataTypes } from 'sequelize';
import { sequelize } from '../database/postgres.js'; 

export const Logs = sequelize.define('tb_logs',
    {
        int_log_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        str_log_descripcion: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        dt_fecha_creacion: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
    },
    {
        schema: 'public',
        timestamps: false,
        freezeTableName: true
    }
);