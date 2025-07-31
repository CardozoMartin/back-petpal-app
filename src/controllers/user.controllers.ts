import { Request, Response } from "express";
import { UserService } from "../services/user.services";
import { ICreateUser, ICreateUserResponse, IErrorResponse } from "../types/types";


export class UserControllers {

    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }
    //método para registrar un usuario
    async postUser(req: Request, res: Response): Promise<Response> {

        try {
            //obtenemos los datos del usuario del body
            const dataUser: ICreateUser = req.body;
            const user = await this.userService.createUser(dataUser);
            //esta sera la respuesta por interface para la creacion de un usuario
            const reponse: ICreateUserResponse = {
                success: true,
                message: 'Usuario creado exitosamente',
                data: user,
                timestamp: new Date()
            }

            return res.status(201).json(reponse);

        } catch (error) {
            const errorResponse: IErrorResponse = {
                success: false,
                error: error.message,
                timestamp: new Date()
            };
            return res.status(500).json(errorResponse);
        }
    }
    //metodo para verificar el token de verificacion del usuario
    async verifyAccount(req: Request, res: Response): Promise<void> {
        const { token} = req.params;

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
}

       
