import { Router } from "express";
import usuariosRoutes from "./usuarios/usuarios.routes.js";


const router = Router();


//ruta de informacion del sistema

router.get("/info", (req, res) => {
    res.json({
      Nombre: "Api Contenido",
      Version: "2.0.0",
      Descripcion:
        "Manejo de contenido de la aplicacion",
      Autor: "Homero Ojeda",
      Email: "homero6834@gmail.com",
      Licencia: "MIT",
      Github: "",
      Documentacion: "",
      Estado: "En desarrollo",
      "Fecha de creacion": "2023-10-16",
      "Fecha de actualizacion": new Date(),
    });
});




router.use("/usuarios", usuariosRoutes);









export default router;