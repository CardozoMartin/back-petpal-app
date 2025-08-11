import { NextFunction, Request, Response } from "express";
import { Schema } from "joi"; // Faltaba importar Schema

class validacionMiddleware {
    // Genérico para cualquier schema
    static validacionSchema(schema: Schema) {
        return (req: Request, res: Response, next: NextFunction): void => {
            const { error, value } = schema.validate(req.body, {
                abortEarly: false,
                allowUnknown: true,
                stripUnknown: true
            });

            // Muestra todos los errores que puedan tener
            if (error) {
                const errores = error.details.map(detalle => ({
                    campo: detalle.path.join('.'),
                    mensaje: detalle.message
                }));

                res.status(400).json({
                    error: "Error de validacion",
                    detalles: errores
                });
                return;

            }

            req.body = value;
            next();
        };
    }
}

export default validacionMiddleware;