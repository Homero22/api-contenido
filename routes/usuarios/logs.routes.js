import { Router } from "express";

import logsController from "../../controllers/logs.controller.js";

const router = Router();

router.get("/", logsController.obtenerLogs);

router.post("/", logsController.crearLogs);

router.get("/error", logsController.error);

export default router;