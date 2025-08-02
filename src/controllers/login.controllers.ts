import { UserService } from "../services/user.services";
import { IErrorResponse, ISuccessResponse, IUserData, IUserResponse } from "../types/types";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import dotenv from "dotenv";
import { injectable } from "tsyringe";

dotenv.config();
@injectable()
export class LoginControllers {
    
    constructor(private userService: UserService) {}

    async postLogin(req: Request, res: Response): Promise<Response> {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                const errorResponse: IErrorResponse = {
                    success: false,
                    error: 'Email y contraseña son requeridos',
                    timestamp: new Date(),
                };
                return res.status(400).json(errorResponse);
            }

            console.log("Intento de inicio de sesión para:", email);

            // ✅ Llamada corregida al método
            const existingUser = await this.userService.getUserByEmail(email);
            
            if (!existingUser) {
                const errorResponse: IErrorResponse = {
                    success: false,
                    error: 'Credenciales inválidas',
                    timestamp: new Date(),
                };
                return res.status(401).json(errorResponse);
            }

            // Verificar contraseña
            const isPasswordValid = await bcrypt.compare(password, existingUser.password);
            if (!isPasswordValid) {
                const errorResponse: IErrorResponse = {
                    success: false,
                    error: 'Credenciales inválidas',
                    timestamp: new Date(),
                };
                return res.status(401).json(errorResponse);
            }

            // Verificar cuenta
            if (!existingUser.isVerified) {
                const errorResponse: IErrorResponse = {
                    success: false,
                    error: 'Cuenta no verificada. Por favor, verifica tu email.',
                    timestamp: new Date(),
                };
                return res.status(403).json(errorResponse);
            }

            // Preparar respuesta de usuario
            const userResponse: IUserData = {
                _id: existingUser._id,
                email: existingUser.email,
                name: existingUser.name,
                isVerified: existingUser.isVerified,
                createdAt: existingUser.createdAt,
                updatedAt: existingUser.updatedAt
            };

            // Generar token
            const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-key";
            const token = jwt.sign(
                { 
                    userId: userResponse._id,
                    email: userResponse.email 
                },
                JWT_SECRET,
                { expiresIn: "1h" }
            );

            const successResponse: ISuccessResponse<{user: IUserData; token: string}> = {
                success: true,
                data: {
                    user: userResponse,
                    token: token
                }
            };

            console.log(`Login exitoso para usuario: ${email}`);
            return res.status(200).json(successResponse);

        } catch (error) {
            console.error('Error en login:', error);
            
            const errorResponse: IErrorResponse = {
                success: false,
                error: 'Error interno del servidor',
                timestamp: new Date(),
            };
            return res.status(500).json(errorResponse);
        }
    }
}