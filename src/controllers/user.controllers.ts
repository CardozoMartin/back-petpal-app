import { injectable } from "tsyringe";
import { Request, Response } from "express";
import { UserService } from "../services/user.services";
import { ICreateUser, ICreateUserResponse, IErrorResponse, ISuccessResponse, IUserResponse } from "../types/types";

@injectable()
export class UserControllers {

    constructor(private userService: UserService) {}

    //método para registrar un usuario
    async postUser(req: Request, res: Response): Promise<Response> {
        try {
            //obtenemos los datos del usuario del body
            const dataUser: ICreateUser = req.body;
            const user = await this.userService.createUser(dataUser);

            //esta sera la respuesta por interface para la creacion de un usuario
            const response: ICreateUserResponse = {
                success: true,
                message: 'Usuario creado exitosamente',
                data: user,
                timestamp: new Date()
            }

            return res.status(201).json(response);
        } catch (error: any) {
            // Error específico de email duplicado
            if (error.message === 'El usuario ya existe con este email') {
                return res.status(409).json({ // 409 Conflict es más apropiado
                    success: false,
                    message: 'El email ya está registrado', // Mensaje más user-friendly
                    error: 'DUPLICATE_EMAIL', // Código de error para el frontend
                    timestamp: new Date(),
                    field: 'email'
                });
            }

            // Error genérico del servidor
            const errorResponse: IErrorResponse = {
                success: false,
                error: error.message || 'Error interno del servidor',
                timestamp: new Date()
            };

            return res.status(500).json(errorResponse);
        }
    }
    //metodo para verificar el token de verificacion del usuario
    async verifyAccount(req: Request, res: Response): Promise<void> {
        const { token } = req.params;

        try {
            const isVerified = await this.userService.serviceVerifyAccount(token);
            if (!isVerified) {
                res.status(400).json({
                    success: false,
                    message: 'Token de verificación inválido',
                    timestamp: new Date()
                });
            }

            const successResponse = {
                success: true,
                message: 'Cuenta verificada exitosamente',
                timestamp: new Date()
            };
            res.status(200).json(successResponse);
        } catch (error) {
            const errorResponse: IErrorResponse = {
                success: false,
                error: error.message,
                timestamp: new Date()
            };
            res.status(500).json(errorResponse);
        }
    }
    //controlador para obtener todos los usuarios
    async getUsers(req: Request, res: Response): Promise<Response> {
        try {
            //obtenemos todos los usuarios
            const users = await this.userService.getAllUsers();

            if (users.length === 0) {
                const errorResponse: IErrorResponse = {
                    success: false,
                    error: 'No hay usuarios registrados',
                    timestamp: new Date()
                };
                return res.status(404).json(errorResponse);
            }

            const successResponse: ISuccessResponse<IUserResponse[]> = {
                success: true,
                data: users,
                timestamp: new Date()
            };
            return res.status(200).json(successResponse);
        } catch (error) {
            const errorResponse: IErrorResponse = {
                success: false,
                error: error.message,
                timestamp: new Date()
            };
            return res.status(500).json(errorResponse);
        }
    }
    //controlador para obtener un usuario por id
    async UserGetById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const user = await this.userService.getUserById(id);
            if (!user) {
                const errorResponse: IErrorResponse = {
                    success: false,
                    error: 'Usuario no encontrado',
                    timestamp: new Date()
                };
                return res.status(404).json(errorResponse);
            }
            const successResponse: ISuccessResponse<IUserResponse[]> = {
                success: true,
                data: [user],
                timestamp: new Date()
            };
            return res.status(200).json(successResponse);
        } catch (error) {
            const errorResponse: IErrorResponse = {
                success: false,
                error: error.message,
                timestamp: new Date()
            };
            return res.status(500).json(errorResponse);
        }
    }
    //controlador para actualizar un usuario
    async putUser(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const dataUser: ICreateUser = req.body;
            const updateUser = await this.userService.serviceUpdateUser(id, dataUser);
            if (!updateUser) {
                const errorResponse: IErrorResponse = {
                    success: false,
                    error: 'Usuario no encontrado',
                    timestamp: new Date()
                };
                return res.status(404).json(errorResponse);
            }
            const successResponse: ISuccessResponse<IUserResponse> = {
                success: true,
                data: updateUser,
                timestamp: new Date()
            };
            return res.status(200).json(successResponse);
        } catch (error) {
            const errorResponse: IErrorResponse = {
                success: false,
                error: error.message,
                timestamp: new Date()
            };
            return res.status(500).json(errorResponse);
        }
    }
    //controlador para eliminar un usuario
    async deleteUser(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const deleted = await this.userService.serviceDeleteUser(id);

            // Ahora deleted es boolean, así que la validación funciona
            if (!deleted) {
                const errorResponse: IErrorResponse = {
                    success: false,
                    error: 'Usuario no encontrado',
                    timestamp: new Date()
                };
                return res.status(404).json(errorResponse);
            }

            // Para eliminación exitosa
            const successResponse: ISuccessResponse<{ message: string }> = {
                success: true,
                data: { message: 'Usuario eliminado exitosamente' },
                timestamp: new Date()
            };
            return res.status(200).json(successResponse);

        } catch (error) {
            const errorResponse: IErrorResponse = {
                success: false,
                error: error.message,
                timestamp: new Date()
            };
            return res.status(500).json(errorResponse);
        }
    }
}


