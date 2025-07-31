import { UserRepository } from "../repositories/user.repositories";
import { ICreateUser, IUserResponse } from "../types/types";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { EmailService } from "./email.service";

export class UserService {

    //llamamos al repositorio privado
    private userRepository: UserRepository;
    private emailService: EmailService;

    //hacemos injection de dependencias
    constructor(userRepository: UserRepository, emailService: EmailService) {
        this.userRepository = userRepository;
        this.emailService = emailService || new EmailService();
    }

    //metodo para crear un usuario
    async createUser(dataUser: ICreateUser): Promise<IUserResponse> {

        try {
            //primero validamos que el usuario no exista por su email
            const existingUser = await this.userRepository.getUserByEmail(dataUser.email);
            if (existingUser) {
                throw new Error('El usuario ya existe con este email');
            }

            //hasheamos la contraseña con bcrypt
            //encriptar la contraseña
            const salt = 12;
            const hash = await bcrypt.hash(dataUser.password, salt);

            //generamos el token de verificaion
            const verificationToken = crypto.randomBytes(32).toString('hex');

            //enviamos el email de bievenida y verificaion
            await this.emailService.sendWelcomeEmailAndVerification(dataUser.email, dataUser.name, verificationToken);
            //creamos el usuario
            const newUser = await this.userRepository.createUser({ ...dataUser, password: hash, verificationToken });

            //retornamos el usuario creado
            return this.toUserResponse(newUser);
        } catch (error) {
            throw new Error("Error al crear el usuario");
        }

    }
    private toUserResponse(user: any): IUserResponse {
        return {
            _id: user._id.toString(),
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };
    }

    //servicio para verificar la cuenta del usuario
    async serviceVerifyAccount(token: string): Promise<boolean> {
        try{
            const user = await this.userRepository.getAllUsers();
            const userToVerify = user.find(user => user.verificationToken === token);
            if (!userToVerify) {
                throw new Error('Token de verificación inválido');
            }
            //actualizamos el usuario para marcarlo como verificado
            await this.userRepository.updateUser(userToVerify._id.toString(), { isVerified: true, verificationToken: undefined });
            return true;
        } catch (error) {
            throw new Error("Error al verificar la cuenta");
        }
}
}

