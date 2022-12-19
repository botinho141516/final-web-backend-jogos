import Desenvolvedor, {
  DesenvolvedorModel,
} from '../database/models/desenvolvedor.model';
import { IControllerResponse } from '../interfaces/controller.interface';

interface ICriarDesenvolvedor {
  nome: string;
}
const initDesenvolvedorController = () => {
  const criarDesenvolvedor = async ({
    nome,
  }: ICriarDesenvolvedor): Promise<IControllerResponse<DesenvolvedorModel>> => {
    const desenvolvedor = await Desenvolvedor.create({
      nome,
    });

    return {
      status: 201,
      mensagem: 'Desenvolvedor criado',
      data: desenvolvedor,
    };
  };

  const obterTodosDesenvolvedores = async (): Promise<
    IControllerResponse<DesenvolvedorModel[]>
  > => {
    const desenvolvedores: DesenvolvedorModel[] = await Desenvolvedor.find();

    return {
      status: 200,
      mensagem: 'Desenvolvedores obtidos',
      data: desenvolvedores,
    };
  };

  return {
    criarDesenvolvedor,
    obterTodosDesenvolvedores,
  };
};

export default initDesenvolvedorController;
