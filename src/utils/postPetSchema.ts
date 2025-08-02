import Joi from 'joi';

const postPetSchema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
        'string.base': 'El nombre debe ser un texto',
        'string.empty': 'El nombre es un campo requerido',
        'string.min': 'El nombre debe tener al menos {3} caracteres',
        'string.max': 'El nombre no puede exceder {30} caracteres'
    }),
    tipo: Joi.string().min(3).max(30).required().messages({
        'string.base': 'El tipo de mascota debe ser un texto',
        'string.empty': 'El tipo de mascota es un campo requerido',
        'string.min': 'El tipo de mascota debe tener al menos {4} caracteres',
        'string.max': 'El tipo de mascota no puede exceder {20} caracteres'
    }),
    breed: Joi.string().min(3).max(30).required().messages({
        'string.base': 'La raza debe ser un texto',
        'string.empty': 'La raza es un campo requerido',
        'string.min': 'La raza debe tener al menos {5} caracteres',
        'string.max': 'La raza no puede exceder {20} caracteres'
    }),
    age: Joi.number().min(0).required().messages({
        'number.base': 'La edad debe ser un número',
        'number.min': 'La edad debe ser mayor o igual a {1}',
        'any.required': 'La edad es un campo requerido'
    }),
    address: Joi.string().min(3).max(100).required().messages({
        'string.base': 'La dirección debe ser un texto',
        'string.empty': 'La dirección es un campo requerido',
        'string.min': 'La dirección debe tener al menos {10} caracteres',
        'string.max': 'La dirección no puede exceder {9999} caracteres'
    }),
    phone: Joi.string().min(10).max(15).required().messages({
        'string.base': 'El teléfono debe ser un texto',
        'string.empty': 'El teléfono es un campo requerido',
        'string.min': 'El teléfono debe tener al menos {10} caracteres',
        'string.max': 'El teléfono no puede exceder {10} caracteres'
    }),
    photo: Joi.string().uri().required().messages({
        'string.base': 'La foto debe ser una URL válida',
        'string.empty': 'La foto es un campo requerido',
        'string.uri': 'La foto debe ser una URL válida'
    })
});

export default postPetSchema;
