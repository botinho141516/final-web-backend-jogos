import mongoose from 'mongoose';
import { JogoSchema } from './jogo.model';

export interface AvaliacaoModel {
  jogo: string;
  nota: number;
  descricao: string;
}

export const AvaliacaoSchema = new mongoose.Schema({
  jogoId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    trim: true,
  },
  nota: {
    type: Number,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
    trim: true,
  },
});

const Avaliacao = mongoose.model('avaliacao', AvaliacaoSchema, 'avaliacoes');

export default Avaliacao;
