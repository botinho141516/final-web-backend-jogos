import express, { Request, Response } from 'express';
import initControllers from '../controllers/index.controller';

interface InitDesenvolvedorRouter {
  controllers: ReturnType<typeof initControllers>;
}
const initDesenvolvedorRouter = ({ controllers }: InitDesenvolvedorRouter) => {
  const desenvolvedorRouter = express.Router();

  desenvolvedorRouter.post('/', async (req: Request, res: Response) => {
    const { nome } = req.body;
    try {
      const response =
        await controllers.desenvolvedorController.criarDesenvolvedor({ nome });

      return res.status(response.status).send(response);
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        status: 500,
        message: 'Erro ao obter todos os desenvolvedores',
      });
    }
  });

  desenvolvedorRouter.get('/', async (req: Request, res: Response) => {
    try {
      const response =
        await controllers.desenvolvedorController.obterTodosDesenvolvedores();

      return res.status(response.status).send(response);
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        status: 500,
        message: 'Erro ao obter todos os desenvolvedores',
      });
    }
  });

  return desenvolvedorRouter;
};

export default initDesenvolvedorRouter;
