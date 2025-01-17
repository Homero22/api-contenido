import e from "express";
import { Logs } from "../models/logs.models.js";


const obtenerLogs = async (req, res) => {
    try {
        const logs = await Logs.findAll();
        res.json({
            status: true,
            data: logs
        });
    } catch (error) {
        res.json({
            status: false,
            data: error
        });
    }
};

const crearLogs = async (req, res) => {
    const { str_log_descripcion } = req.body;
    try {
        const log = await Logs.create({
            str_log_descripcion
        });
        res.json({
            status: true,
            data: log
        });
    } catch (error) {
        res.json({
            status: false,
            data: error
        });
    }
};

//funcion que devuelve un error de prueba

const error = async (req, res) => {
    try {
        throw new Error('Error de prueba');
    } catch (error) {
        res.json({
            status: false,
            data: error
        });
    }
}

export default { obtenerLogs, crearLogs, error };