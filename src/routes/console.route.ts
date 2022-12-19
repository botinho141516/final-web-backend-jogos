import express, { Request, Response } from 'express';
import initControllers from '../controllers/index.controller';

interface InitConsoleRouter {
  controllers: ReturnType<typeof initControllers>;
}
const initConsoleRouter = ({ controllers }: InitConsoleRouter) => {
  const consoleRouter = express.Router();

  consoleRouter.get('/', async (req: Request, res: Response) => {
    try {
      const response = await controllers.consoleController.obterTodosConsoles();

      return res.status(response.status).send(response);
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        status: 500,
        message: 'Erro ao obter todos os consoles',
      });
    }
  });

  return consoleRouter;
};

export default initConsoleRouter;
