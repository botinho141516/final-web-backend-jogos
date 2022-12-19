import express from 'express';
import initControllers from '../controllers/index.controller';
import initAuthRouter from './auth.route';
import initAvaliacaoRouter from './avaliacao.route';
import initConsoleRouter from './console.route';
import initDesenvolvedorRouter from './desenvolvedor.route';
import initGeneroRouter from './genero.route';
import initJogoRouter from './jogo.route';

interface InitRoutes {
  controllers: ReturnType<typeof initControllers>;
}

const initRoutes = ({ controllers }: InitRoutes) => {
  const router = express.Router();
  const authRouter = initAuthRouter({ controllers });
  const jogoRouter = initJogoRouter({ controllers });
  const avaliacaoRouter = initAvaliacaoRouter({ controllers });
  const generoRouter = initGeneroRouter({ controllers });
  const consoleRouter = initConsoleRouter({ controllers });
  const desenvolvedorRouter = initDesenvolvedorRouter({ controllers });

  router.use('/', authRouter);
  router.use('/jogo', jogoRouter);
  router.use('/avaliacao', avaliacaoRouter);
  router.use('/genero', generoRouter);
  router.use('/console', consoleRouter);
  router.use('/desenvolvedor', desenvolvedorRouter);

  return router;
};
export default initRoutes;
