import { Router } from "express";

import usuariosController from "../../controllers/usuario.controller.js";

const router = Router();


router.get("/", usuariosController.obtenerUsuarioByCedula);
router.post("/", usuariosController.crearUsuario);
router.post("/upload/:id", usuariosController.subirImagenes);




export default router;