import express, { Application } from "express";
import cors from 'cors'
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import petRouter from "./routes/pet.routes";
import petReportRouter from './routes/pet.reports.route'

export class Server {
    //vamos a colocar nuestras variables
    private app: Application
    private port: string;

    //constructor para iniciar las variables y otras cosas
    constructor() {
        this.app = express()
        this.port = process.env.PORT || '4500'
        this.middlewares();
        this.routes();
    }
    
    //configuramos los middlewares
    middlewares() {
        this.app.use(cors({
            origin: [
                '*'
            ],
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
            credentials: true,
            allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
        }));

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }


    //aqui vamos a poner las rutas
    routes() {
        this.app.use('/api/auth', authRoutes);
        this.app.use('/api/user', userRoutes);
        this.app.use('/api/pet', petRouter);
        this.app.use('/api/report', petReportRouter);
    }

    //iniciamos el servidor
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo con exito')
        })
    }
}