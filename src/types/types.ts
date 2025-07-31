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
    createdAt: Date;
    updatedAt?: Date;
}


//Respuestas para los controladores


//interfaz base para todas las respuestas
export interface IBaseApiResponse {
    success: boolean;
    message?: string;
    timestamp?: Date;
}

// Respuesta de éxito genérica
export interface ISuccessResponse<T> extends IBaseApiResponse {
    data: T;
    success:true;
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