import { IUser } from "../models/user.model";
import { ICreateUser, IUpdateUser } from "../types/types";



export interface IUserRepository {
    getAllUsers(): Promise<IUser[]>;
    getUserById(id: string): Promise<IUser | null>;
    getUserByEmail(email: string): Promise<IUser | null>;
    createUser(dataUser: ICreateUser): Promise<IUser>;
    updateUser(id: string, dataUser: IUpdateUser): Promise<IUser | null>;
    deleteUser(id: string): Promise<IUser | null>;
}