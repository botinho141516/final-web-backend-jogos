import mongoose from 'mongoose';

export interface DesenvolvedorModel {
  nome: string;
}

export const DesenvolvedorSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    trim: true,
  },
});

const Desenvolvedor = mongoose.model(
  'desenvolvedor',
  DesenvolvedorSchema,
  'desenvolvedores'
);

export default Desenvolvedor;
