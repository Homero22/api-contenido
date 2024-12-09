import app from "./app.js";
import { configVariables } from "./configuration/variablesGlobales.js";
import { sequelize } from "./database/postgres.js";




async function main(port) {
  try {
    console.log("Iniciando servidor...");
    //Conectarse a la base de datos
    await sequelize.authenticate();

    //Sincronizar la base de datos
    await sequelize.sync({ force: false, logging: false });

    if (configVariables.env == "production") {
      //Iniciar el servidor
      app.listen(port, () => {
        console.log(
          `Servidor produccion escuchando en el puerto ${port}`
        );
      });
    }else{
      //Iniciar el servidor
      app.listen(port, () => {
        console.log(
          `Servidor desarrollo escuchando en el puerto ${port}`
        );
      });
      
    }
  } catch (error) {
    console.log(error);
  }
}
main(configVariables.port);
