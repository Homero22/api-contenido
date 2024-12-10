import { Router } from "express";

import usuariosController from "../../controllers/usuario.controller.js";

const router = Router();


router.get("/", usuariosController.obtenerUsuarioByCedula);
router.post("/", usuariosController.crearUsuario);
router.post("/upload/:id", usuariosController.subirImagenes);
router.post("/page", usuariosController.subirImagenesAdmin);






export default router;