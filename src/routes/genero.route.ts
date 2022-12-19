import express, { Request, Response } from 'express';
import initControllers from '../controllers/index.controller';

interface InitGeneroRouter {
  controllers: ReturnType<typeof initControllers>;
}
const initGeneroRouter = ({ controllers }: InitGeneroRouter) => {
  const generoRouter = express.Router();

  generoRouter.get('/', async (req: Request, res: Response) => {
    try {
      const response = await controllers.generoController.obterTodosGeneros();

      return res.status(response.status).send(response);
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        status: 500,
        message: 'Erro ao obter todos os generos',
      });
    }
  });

  return generoRouter;
};

export default initGeneroRouter;
