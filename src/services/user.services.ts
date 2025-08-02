import { UserRepository } from "../repositories/user.repositories";
import { ICreateUser, IUserResponse, IUserResponseWithPassword } from "../types/types";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { EmailService } from "./email.service";
import { injectable } from "tsyringe";

@injectable()
export class UserService {


    //hacemos injection de dependencias
    constructor(private userRepository: UserRepository,
        private emailService: EmailService) { }
    private toUserResponse(user: any): IUserResponse {
        return {
            _id: user._id.toString(),
            name: user.name,
            email: user.email,
            isVerified: user.isVerified,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };
    }
    private toUserResponseWithPassword(user: any): IUserResponseWithPassword {
        // Implementa tu lógica de transformación aquí
        const userResponse: IUserResponseWithPassword = {
            _id: user._id.toString(),
            name: user.name,
            email: user.email,
            isVerified: user.isVerified,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            password: user.password
        };
        return userResponse;
    }
    //metodo para crear un usuario
    async createUser(dataUser: ICreateUser): Promise<IUserResponse> {
        try {
            // Primero validamos que el usuario no exista por su email
            const existingUser = await this.userRepository.getUserByEmail(dataUser.email);
            if (existingUser) {
                throw new Error('El usuario ya existe con este email');
            }

            // Hasheamos la contraseña con bcrypt
            const salt = 12;
            const hash = await bcrypt.hash(dataUser.password, salt);

            // Generamos el token de verificación
            const verificationToken = crypto.randomBytes(32).toString('hex');

            // Enviamos el email de bienvenida y verificación
            await this.emailService.sendWelcomeEmailAndVerification(
                dataUser.email,
                dataUser.name,
                verificationToken
            );

            // Creamos el usuario
            const newUser = await this.userRepository.createUser({
                ...dataUser,
                password: hash,
                verificationToken
            });

            // Retornamos el usuario creado
            return this.toUserResponse(newUser);

        } catch (error: any) {
            console.log(error);

            // Si es el error específico de email duplicado, lo re-lanzamos tal como está
            if (error.message === 'El usuario ya existe con este email') {
                throw error; // Re-lanzamos el error original
            }

            // Para cualquier otro error, lanzamos un error genérico
            throw new Error("Error al crear el usuario");
        }
    }

    //servicio para verificar la cuenta del usuario
    async serviceVerifyAccount(token: string): Promise<boolean> {
        try {
            // Buscar directamente por token en lugar de traer todos los usuarios
            const user = await this.userRepository.getUserByVerificationToken(token);

            if (!user) {
                throw new Error('Token de verificación inválido');
            }

            // Actualizar usuario
            await this.userRepository.updateUser(user._id.toString(), {
                isVerified: true,
                verificationToken: undefined
            });

            return true;
        } catch (error) {
            throw new Error("Error al verificar la cuenta");
        }
    }
    //servicio para obtener todos los usuarios
    async getAllUsers(): Promise<IUserResponse[]> {
        try {
            //obtenemos todos los usuarios
            const users = await this.userRepository.getAllUsers();
            //convertimos los usuarios a IUserResponse
            const userResponse = users.map(user => this.toUserResponse(user));

            //retornamos los usuarios
            return userResponse;

        } catch (error) {
            throw new Error("Error al obtener los usuarios");
        }
    }
    //servicio para obtener un usuario por id
    async getUserById(id: string): Promise<IUserResponse> {
        try {
            //obtenemos el usuario por id
            const user = await this.userRepository.getUserById(id);
            if (!user) {
                throw new Error('Usuario no encontrado');
            }

            return this.toUserResponse(user);
        } catch (error) {
            throw new Error("Error al obtener el usuario por id");
        }
    }
    //servicio para obtener un usuario por email
    async getUserByEmail(email: string): Promise<IUserResponseWithPassword | null> {
        try {
            // Verificar que userRepository esté inicializado
            if (!this.userRepository) {
                throw new Error('UserRepository no está inicializado');
            }

            const user = await this.userRepository.getUserByEmail(email);
            console.log("Usuario encontrado:", user ? "Sí" : "No");

            return user ? this.toUserResponseWithPassword(user) : null;
        } catch (error) {
            console.error("Error al obtener usuario por email:", error);
            throw new Error("Error al obtener el usuario por email");
        }
    }
    //servicio para actualizar un usuario
    async serviceUpdateUser(id: string, dataUser: ICreateUser): Promise<IUserResponse> {
        try {
            //buscamos el usaurio por id
            const user = await this.userRepository.getUserById(id);
            if (!user) {
                throw new Error('Usuario no encontrado');
            }
            //ahora actualizamos el usuario
            const updateUser = await this.userRepository.updateUser(id, dataUser);
            return this.toUserResponse(updateUser);
        } catch (error) {
            throw new Error("Error al actualizar el usuario");
        }
    }
    //servicio para eliminar un usuario
    async serviceDeleteUser(id: string): Promise<boolean> {
        try {
            // Buscamos y eliminamos el usuario por id
            const deletedUser = await this.userRepository.deleteUser(id);

            // Si no se encontró el usuario para eliminar
            if (!deletedUser) {
                return false; // Retorna false en lugar de lanzar error
            }

            return true; // Eliminación exitosa
        } catch (error) {
            throw new Error(`Error al eliminar el usuario: ${error.message}`);
        }
    }

}

