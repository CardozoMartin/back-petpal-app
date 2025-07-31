import { IUserRepository } from "../interface/user.interface";
import User, { IUser } from "../models/user.model";

export class UserRepository implements IUserRepository {
    async createUser(dataUser: Partial<IUser>): Promise<IUser> {
        try {
            const user = new User(dataUser);
            await user.save();
            return user;
        } catch (error) {
            throw new Error("Error al crear el usuario");
        }
    }

    async updateUser(id: string, dataUser: Partial<IUser>): Promise<IUser | null> {
        try {
            const updatedUser = await User.findByIdAndUpdate(id, dataUser, { new: true });
            return updatedUser;
        } catch (error) {
            throw new Error("Error al actualizar el usuario");
        }
    }

    async deleteUser(id: string): Promise<IUser | null> {
        try {
            const deletedUser = await User.findByIdAndDelete(id);
            return deletedUser;
        } catch (error) {
            throw new Error("Error al eliminar el usuario");
        }
    }

    async getAllUsers(): Promise<IUser[]> {
        try {
            const users: IUser[] = await User.find();
            return users;
        } catch (error) {
            throw new Error("Error al obtener los usuarios");
        }
    }

    async getUserById(id: string): Promise<IUser | null> {
        try {
            const user: IUser | null = await User.findById(id);
            return user;
        } catch (error) {
            throw new Error("Error al obtener el usuario");
        }
    }
    async getUserByEmail(email: string): Promise<IUser | null> {
        return await User.findOne({ email: email.toLowerCase() }); // Retorna IUser | null
    }
}


