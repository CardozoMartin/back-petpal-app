// Interfaz para crear un usuario (entrada)
export interface ICreateUser {
    name: string;
    email: string;
    password: string;
}
export interface IUserData {
    _id: string;
    name: string;
    email: string;
    isVerified?: boolean;
    token?: string; // opcional para el token de verificación
    createdAt: Date;
    updatedAt?: Date;
}
// Interfaz para actualizar un usuario (entrada)
export interface IUpdateUser {
    name?: string;
    email?: string;
    password?: string;
}

// Interfaz para respuesta (sin password)
export interface IUserResponse {
    _id: string;
    name: string;
    email: string;
    isVerified?: boolean;
    createdAt: Date;
    updatedAt?: Date;
}
//interfaz para la respuesta con contraseña del usuario
export interface IUserResponseWithPassword extends IUserData {
    password: string;
}
//interfaz para reporte de mascotas perdidas, encontradas en adopcion o que buscan transito
export interface IReportPetCreate {
    tipeReport: string; // ✅ Agregar este campo que faltaba
    namePet: string;    // ✅ Cambiar de petName a namePet
    tipoPet: string;
    breed: string;
    age: number;
    sex: string;
    size: string;
    address: string;
    date?: string;      // ✅ Hacer opcional ya que no siempre se envía
    descriptionPet: string;
    photo?: string;
    numberContact: string;
    user: Array<{ id: string; name: string, email: string, phone: string, photo?: string }>;
    status?: boolean;
    userId: string
}

export interface IReportPetResponse {
    _id: string;
    tipeReport: string; // ✅ Agregar este campo que faltaba
    namePet: string;    // ✅ Cambiar de petName a namePet
    tipoPet: string;
    breed: string;
    age: number;
    sex: string;
    size: string;
    descriptionPet: string;
    address: string;
    date?: string;      // ✅ Hacer opcional
    photo?: string;
    numberContact: string;
    user: Array<{ id: string; name: string, email: string, phone: string, photo?: string }>;
    status?: boolean;
    userId: string
}

export interface IReportPetUpdate {
    tipeReport?: string; // ✅ Agregar este campo que faltaba
    namePet?: string;    // ✅ Cambiar de petName a namePet
    tipoPet?: string;
    breed?: string;
    age?: number;
    sex?: string;
    size?: string;
    address?: string;
    date?: string;
    descriptionPet?: string;
    photo?: string;
    numberContact?: string;
    user?: Array<{ id: string; name: string, email: string, phone: string, photo?: string }>;
    status?: boolean;
}

//Respuestas para las mascotas
export interface IPetCreate {
    name: string;
    tipo: string;
    breed: string;
    age: number;
    address: string;
    phone: string;
    photo?: string;
    idUser: string; // ID del usuario propietario
}

export interface IPetUpdate {
    name?: string;
    tipo?: string;
    breed?: string;
    age?: number;
    address?: string;
    phone?: string;
    photo?: string;
    idUser?: string;
}

export interface IPetResponse {
    _id: string;
    name: string;
    tipo: string;
    breed: string;
    age: number;
    address: string;
    phone: string;
    photo?: string;
    idUser: string;
}

//interfaz base para todas las respuestas
export interface IBaseApiResponse {
    success: boolean;
    message?: string;
    timestamp?: Date;
}

// Respuesta de éxito genérica
export interface ISuccessResponse<T> extends IBaseApiResponse {
    data: T;
    success: true;
}
// Respuesta de error genérica
export interface IErrorResponse extends IBaseApiResponse {
    success: false;
    error: string;
    errorCode?: string;
}


//respuesta de creacion de usuario
export interface ICreateUserResponse extends ISuccessResponse<IUserData> {
    message: 'Usuario creado exitosamente';
}