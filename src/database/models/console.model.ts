import mongoose from 'mongoose';

export interface ConsoleModel {
  nome: string;
}

export const ConsoleSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    trim: true,
  },
});
const Console = mongoose.model('console', ConsoleSchema, 'consoles');

export default Console;
