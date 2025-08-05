import Joi from 'joi'

const postPetReportSchema = Joi.object({
    namePet: Joi.string()
        .min(2)
        .max(50)
        .required()
        .messages({
            'string.empty': 'El nombre de la mascota es requeridoooo',
            'string.min': 'El nombre debe tener al menos 2 caracteres',
            'string.max': 'El nombre no puede exceder 50 caracteres'
        }),

    tipoPet: Joi.string()
        .min(3)
        .max(30)
        .required()
        .messages({
            'string.empty': 'El tipo de mascota es requerido',
            'string.min': 'El tipo debe tener al menos 3 caracteres'
        }),

    breed: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            'string.empty': 'La raza es requerida',
            'string.min': 'La raza debe tener al menos 3 caracteres'
        }),

    age: Joi.alternatives()
        .try(
            Joi.number().min(0).max(30),
            Joi.string().min(1).max(3)
        )
        .required()
        .messages({
            'any.required': 'La edad es requerida'
        }),

    sex: Joi.string()
        .valid('macho', 'hembra')
        .required()
        .messages({
            'string.empty': 'El sexo es requerido',
            'any.only': 'El sexo debe ser macho o hembra'
        }),

    size: Joi.string()
        .valid('pequeño', 'mediano', 'grande')
        .required()
        .messages({
            'string.empty': 'El tamaño es requerido',
            'any.only': 'El tamaño debe ser pequeño, mediano o grande'
        }),

    descriptionPet: Joi.string()
        .min(10)
        .max(500)
        .required()
        .messages({
            'string.empty': 'La descripción es requerida',
            'string.min': 'La descripción debe tener al menos 10 caracteres',
            'string.max': 'La descripción no puede exceder 500 caracteres'
        }),

    address: Joi.string()
        .min(5)
        .max(200)
        .required()
        .messages({
            'string.empty': 'La dirección es requerida',
            'string.min': 'La dirección debe tener al menos 5 caracteres'
        }),

    date: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            'string.empty': 'La fecha es requerida'
        }),

    numberContact: Joi.string()
        .min(7)
        .max(15)
        .pattern(/^[0-9+\-\s()]+$/)
        .required()
        .messages({
            'string.empty': 'El número de contacto es requerido',
            'string.min': 'El número debe tener al menos 7 dígitos',
            'string.pattern.base': 'El número de contacto tiene formato inválido'
        }),

    nameUser: Joi.string()
        .min(2)
        .max(100)
        .required()
        .messages({
            'string.empty': 'El nombre del usuario es requerido',
            'string.min': 'El nombre debe tener al menos 2 caracteres'
        }),

    photo: Joi.string()
        .uri()
        .optional()
        .allow('')
        .messages({
            'string.uri': 'La URL de la foto debe ser válida'
        })
});

export default postPetReportSchema;