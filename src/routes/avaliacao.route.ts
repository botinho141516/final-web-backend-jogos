import express, { Request, Response } from 'express';
import initControllers from '../controllers/index.controller';

interface InitAvaliacaoRouter {
  controllers: ReturnType<typeof initControllers>;
}
const initAvaliacaoRouter = ({ controllers }: InitAvaliacaoRouter) => {
  const avaliacaoRouter = express.Router();

  avaliacaoRouter.post('/', async (req: Request, res: Response) => {
    try {
      const { descricao, jogoId, nota } = req.body;

      const response = await controllers.avaliacaoController.criarAvaliacao({
        descricao,
        jogoId,
        nota,
      });

      return res.status(response.status).send(response);
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        status: 500,
        message: 'Erro ao criar avaliacao',
      });
    }
  });

  avaliacaoRouter.get('/', async (req: Request, res: Response) => {
    const { jogo } = req.query;

    if (typeof jogo !== 'string') throw new Error();

    try {
      const response =
        await controllers.avaliacaoController.obterTodasAvaliacoes({
          jogo,
        });

      return res.status(response.status).send(response);
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        status: 500,
        message: 'Erro ao obter todas avaliacoes',
      });
    }
  });

  return avaliacaoRouter;
};

export default initAvaliacaoRouter;
