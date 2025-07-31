import express, { Application } from "express";
import cors from 'cors'

export class Server {
    //vamos a colocar nuestras variables
    private app: Application
    private port: string;

    //constructor para iniciar las variables y otras cosas
    constructor() {
        this.app = express()
        this.port = process.env.PORT || '4500'
        this.middlewares();
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


    //iniciamos el servidor
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo con exito')
        })
    }
}