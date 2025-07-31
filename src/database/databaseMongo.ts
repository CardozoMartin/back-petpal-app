


//configuramos la conexion a nuestra base de datos

import mongoose from "mongoose"
import dotenv from 'dotenv'
dotenv.config()
const connectDB = async (): Promise<void> => {
    try {
        //hacemos la conexion
        const conection = await mongoose.connect(process.env.MONGODB_URI || "en caso de fallar agregar la conexion harcodeada")

        //si se conecta mostramos un mensaje por consola
        console.log("La base de datos fue conectada con exito", conection.connection.host)
    } catch (error) {
        if (error instanceof Error) {
            console.log('Ocurrio un errror al conectar la base de datos')
        } else {
            console.log('Error desconocido al conectar la DB')
        }
        process.exit(1)
    }
}

export default connectDB;