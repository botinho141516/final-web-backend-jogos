import express, { Request, Response } from 'express';
import initControllers from '../controllers/index.controller';

interface InitJogoRouter {
  controllers: ReturnType<typeof initControllers>;
}
const initJogoRouter = ({ controllers }: InitJogoRouter) => {
  const jogoRouter = express.Router();

  jogoRouter.post('/', async (req: Request, res: Response) => {
    try {
      const { consoleId, desenvolvedor, generoId, imagem, nome, resumo } =
        req.body;

      const response = await controllers.jogoController.criarJogo({
        consoleId,
        desenvolvedor,
        generoId,
        imagem,
        nome,
        resumo,
      });

      return res.status(response.status).send(response);
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        status: 500,
        message: 'Erro ao criar jogo',
        data: null,
      });
    }
  });

  jogoRouter.get('/', async (req: Request, res: Response) => {
    const { consoleId, desenvolvedorId, generoId, nome } = req.query;
    try {
      const response = await controllers.jogoController.obterTodosJogos({
        consoleId: consoleId as string,
        desenvolvedorId: desenvolvedorId as string,
        generoId: generoId as string,
        nome: nome as string,
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

  return jogoRouter;
};

export default initJogoRouter;
