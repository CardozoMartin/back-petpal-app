import Joi from 'joi';

export const postUserSchema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
        'string.base': 'El nombre debe ser un texto',
        'string.empty': 'El nombre no puede estar vacío',
        'string.min': 'El nombre debe tener al menos 3 caracteres',
        'string.max': 'El nombre debe tener como máximo 30 caracteres',
        'any.required': 'El nombre es un campo obligatorio'
    }),
    email: Joi.string().email().required().messages({
        'string.base': 'El email debe ser un texto',
        'string.empty': 'El email no puede estar vacío',
        'string.email': 'El email debe ser un email válido',
        'any.required': 'El email es un campo obligatorio'
    }),
    password: Joi.string().min(6).max(100).required().messages({
        'string.base': 'La contraseña debe ser un texto',
        'string.empty': 'La contraseña no puede estar vacía',
        'string.min': 'La contraseña debe tener al menos 6 caracteres',
        'string.max': 'La contraseña debe tener como máximo 100 caracteres',
        'any.required': 'La contraseña es un campo obligatorio'
    })
})