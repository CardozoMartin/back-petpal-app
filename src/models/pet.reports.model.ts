import mongoose, { Schema, Document } from 'mongoose';


export interface IPetReportDocument extends Document {
  _id: mongoose.Types.ObjectId;
  namePet: string;
  tipoPet: string;
  breed: string;
  age: number;
  sex: string;
  size: string;
  address: string;
  date: string;
  descriptionPet: string;
  photo?: string;
  numberContact: string;
  nameUser: string;
}

const PetReportSchema: Schema = new Schema({
  petName: {
    type: String,
    required: [true, 'El nombre de la mascota es requerido'],
    trim: true,
    minlength: [2, 'El nombre de la mascota debe tener al menos 2 caracteres'],
    maxlength: [50, 'El nombre de la mascota no puede exceder 50 caracteres']
  }
  , tipoPet: {
    type: String,
    required: [true, 'El tipo de mascota es requerido'],
    trim: true
  },
  breed: {
    type: String,
    required: [true, 'La raza de la mascota es requerida'],
    trim: true
  },
  age: {
    type: Number,
    required: [true, 'La edad de la mascota es requerida'],
    min: [0, 'La edad de la mascota no puede ser negativa']
  },
  sex: {
    type: String,
    required: [true, 'El sexo de la mascota es requerido'],
    enum: ['masculino', 'femenino'],
    trim: true
  },
  size: {
    type: String,
    required: [true, 'El tamaño de la mascota es requerido'],
    enum: ['pequeño', 'mediano', 'grande'],
    trim: true
  },
  address: {
    type: String,
    required: [true, 'La dirección es requerida'],
    trim: true
  },
  date: {
    type: String,
    required: [true, 'La fecha es requerida'],
    trim: true
  },
  descriptionPet: {
    type: String,
    required: [true, 'La descripción de la mascota es requerida'],
    trim: true
  },
  photo: {
    type: String,
    required: [true, 'La foto de la mascota es requerida'],
    trim: true
  },
  numberContact: {
    type: String,
    required: [true, 'El número de contacto es requerido'],
    trim: true
  },
  nameUser: {
    type: String,
    required: [true, 'El nombre del usuario es requerido'],
    trim: true
  }
})

export default mongoose.model<IPetReportDocument>('PetReport', PetReportSchema);
