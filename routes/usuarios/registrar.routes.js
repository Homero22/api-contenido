import { Router } from "express";

import usuariosController from "../../controllers/login.controller.js";

const router = Router();

router.post("/", usuariosController.crearAdmin);

export default  router;