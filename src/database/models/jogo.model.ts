import mongoose from 'mongoose';

export interface JogoModel {
  nome: string;
  imagem: string;
  resumo: string;
  desenvolvedorId: string;
  generoId: string;
  consoleId: string;
}

export const JogoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    trim: true,
  },
  imagem: {
    type: String,
    trim: true,
  },
  resumo: {
    type: String,
    required: true,
    trim: true,
  },
  consoleId: {
    type: String,
    required: true,
    trim: true,
  },
  desenvolvedorId: {
    type: String,
    required: true,
    trim: true,
  },
  generoId: {
    type: String,
    required: true,
    trim: true,
  },
});

const Jogo = mongoose.model('jogo', JogoSchema, 'jogos');

export default Jogo;
