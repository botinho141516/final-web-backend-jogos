import mongoose from 'mongoose';

export interface UsuarioModel {
  nome: string;
  email: string;
  senha: string;
}

export const UsuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  senha: {
    type: String,
    required: true,
    trim: true,
  },
});

const Usuario = mongoose.model<UsuarioModel>(
  'usuario',
  UsuarioSchema,
  'usuarios'
);

export default Usuario;
