import  express  from "express";
import cors from "cors";
import indexRoutes from "./routes/index.routes.js";
import path from 'path';
import { fileURLToPath } from 'url';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'https://localhost:3000');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
//   });


app.use(express.json());
const whiteList = [
    "http://localhost:4200",
    "http://localhost:3005",
    "http://192.168.100.151:3000",
    "http://0.0.0.0:3000",
    "https://vive1002.vercel.app",
    "https://100.javierandradesd.com",

];

app.use(cors({
    origin: whiteList,
    credentials: true
}));

// Servir archivos estáticos desde la carpeta 'public/uploads'
app.use('/public/uploads', express.static(path.join(__dirname, 'public/uploads')));


export default app;
// Middleware para registrar cada solicitud
app.use((req, res, next) => {
    console.log(`Request Method: ${req.method}, Request URL: ${req.originalUrl}`);
    next(); // Continuar con la siguiente función de middleware o ruta
  });

app.use(indexRoutes);