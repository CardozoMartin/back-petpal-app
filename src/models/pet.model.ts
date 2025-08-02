import moongose, { Schema, Document } from 'mongoose';

//interfaz para el documento completo en la base de datos
export interface IPet extends Document {
  _id: moongose.Types.ObjectId;
  name: string;
  tipo: string;
  breed: string;
  age: number;
  address: string;
  phone: string;
  photo: string;
  createdAt: Date;
  idUser: string;
}

const petSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true,
    minlength: [2, 'El nombre debe tener al menos 2 caracteres'],
    maxlength: [50, 'El nombre no puede exceder 50 caracteres']
  },
  tipo: {
    type: String,
    required: [true, 'El tipo de mascota es requerido'],
    trim: true
  },
  breed: {
    type: String,
    required: [true, 'La raza es requerida'],
    trim: true
  },
  age: {
    type: Number,
    required: [true, 'La edad es requerida']
  },
  address: {
    type: String,
    required: [true, 'La dirección es requerida'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'El teléfono es requerido'],
    trim: true
  },
  photo: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  idUser: {
    type: moongose.Types.ObjectId,
    ref: 'User',
    required: [true, 'El ID del usuario es requerido']
  }
}, {
  timestamps: true // Maneja automáticamente createdAt y updatedAt
})

export default moongose.model<IPet>("Pet", petSchema);