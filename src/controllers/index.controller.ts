import initAvaliacaoContoller from './avaliacao.controller';
import initConsoleController from './console.controller';
import initDesenvolvedorController from './desenvolvedor.controller';
import initGeneroController from './genero.controller';
import initJogoContoller from './jogo.controller';
import initAuthContoller from './auth.controller';

const initControllers = () => {
  const authController = initAuthContoller();
  const avaliacaoController = initAvaliacaoContoller();
  const jogoController = initJogoContoller();
  const generoController = initGeneroController();
  const consoleController = initConsoleController();
  const desenvolvedorController = initDesenvolvedorController();

  return {
    authController,
    avaliacaoController,
    jogoController,
    generoController,
    consoleController,
    desenvolvedorController,
  };
};

export default initControllers;
