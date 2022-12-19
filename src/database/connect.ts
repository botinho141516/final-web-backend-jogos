import mongoose from 'mongoose';

const initDatabase = () => {
  if (!process.env['DATABASE_URL'])
    throw new Error('Não foi definida variável "DATABASE_URL" nop .env');
  mongoose.set('strictQuery', false);
  mongoose.connect(process.env['DATABASE_URL']);
};

export default initDatabase;
