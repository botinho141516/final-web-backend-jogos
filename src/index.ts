import cors from 'cors';
import { config as dotEnvConfig } from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import initControllers from './controllers/index.controller';
import initDatabase from './database/connect';
import { checkToken } from './middlewares/security';
import initRoutes from './routes/routes';

dotEnvConfig();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(checkToken);

initDatabase();
const controllers = initControllers();
const routes = initRoutes({ controllers });

app.use(routes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(process.env['PORT'], () => {
  console.log('listening on port ' + process.env['PORT']);
});

export default app;
