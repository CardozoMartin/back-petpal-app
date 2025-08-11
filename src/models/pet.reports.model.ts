import mongoose, { Schema, Document } from 'mongoose';

export interface IPetReportDocument extends Document {
  _id: mongoose.Types.ObjectId;
  namePet?: string; // ✅ Cambiado para coincidir con el frontend
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
  tipeReport?: string;
  status?: boolean;
  user: Array<{ id: string; name: string, email: string , phone: string , photo?: string }>;
  userId:string;
}

const PetReportSchema: Schema = new Schema({
  // ✅ Cambiar petName por namePet para coincidir con el frontend
  namePet: {
    type: String,
    required: [true, 'El nombre de la mascota es requerido'],
    trim: true,
    minlength: [2, 'El nombre de la mascota debe tener al menos 2 caracteres'],
    maxlength: [50, 'El nombre de la mascota no puede exceder 50 caracteres']
  },
  tipoPet: {
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
    enum: ['Masculino', 'Femenino'],
    trim: true
  },
  size: {
    type: String,
    required: [true, 'El tamaño de la mascota es requerido'],
    enum: ['Pequeño', 'Mediano', 'Grande'],
    trim: true
  },
  address: {
    type: String,
    required: [true, 'La dirección es requerida'],
    trim: true
  },
  // ✅ Hacer date opcional según el tipo de reporte
  date: {
    type: String,
    required: function() {
      // Solo requerido si NO es "Mascota en Adopción"
      return this.tipeReport !== 'Mascota en Adopción';
    },
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
  user: [{
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    photo: {
      type: String,
      trim: true
    }
  }],
  tipeReport: {
    type: String,
    required: [true, 'El tipo de reporte es requerido'],
    enum: ['Mascota Perdida', 'Mascota Encontrada', 'Mascota en Adopción'],
    trim: true
  },
  status: {
    type: Boolean,
    default: false
  },
  userId:{
    type:String,
    require: true
  }
});

export default mongoose.model<IPetReportDocument>('PetReport', PetReportSchema);