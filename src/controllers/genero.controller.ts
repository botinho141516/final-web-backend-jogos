import Genero, { GeneroModel } from '../database/models/genero.model';
import { IControllerResponse } from '../interfaces/controller.interface';

const initGeneroController = () => {
  const obterTodosGeneros = async (): Promise<
    IControllerResponse<GeneroModel[]>
  > => {
    const generos: GeneroModel[] = await Genero.find();

    return {
      status: 200,
      mensagem: 'Generos obtidos',
      data: generos,
    };
  };

  return {
    obterTodosGeneros,
  };
};

export default initGeneroController;
