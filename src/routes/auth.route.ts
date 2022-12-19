import express, { Request, Response } from 'express';
import initControllers from '../controllers/index.controller';

interface InitAuthRouter {
  controllers: ReturnType<typeof initControllers>;
}
const initAuthRouter = ({ controllers }: InitAuthRouter) => {
  const authRouter = express.Router();

  authRouter.post('/login', async (req: Request, res: Response) => {
    try {
      const { email, senha } = req.body;

      const response = await controllers.authController.login({
        email,
        senha,
      });

      return res.status(response.status).send(response);
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        status: 500,
        message: 'Erro ao logar',
      });
    }
  });

  authRouter.post('/registrar', async (req: Request, res: Response) => {
    try {
      const { email, nome, senha } = req.body;

      const response = await controllers.authController.registrar({
        email,
        senha,
        nome,
      });

      return res.status(response.status).send(response);
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        status: 500,
        message: 'Erro ao logar',
      });
    }
  });

  return authRouter;
};

export default initAuthRouter;
