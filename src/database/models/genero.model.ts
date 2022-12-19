import mongoose from 'mongoose';

export interface GeneroModel {
  nome: string;
}

export const GeneroSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    trim: true,
  },
});

const Genero = mongoose.model('genero', GeneroSchema, 'generos');

export default Genero;
