
import connectDB from "./database/databaseMongo"
import dotenv from 'dotenv'
import { Server } from "./server"
import { container } from "tsyringe";

const starServer = async()=>{
    //primeros antes de iniciar hacemos la conexion a la base de datos
    await connectDB()
    dotenv.config()


    //hacemos una instancia del servidor
    const server = new Server();


    //corremos el servidor
    server.listen();
}

starServer();