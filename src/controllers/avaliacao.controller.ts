import Avaliacao, { AvaliacaoModel } from '../database/models/avaliacao.model';
import { IControllerResponse } from '../interfaces/controller.interface';

export interface ICriarAvaliacao {
  jogoId: string;
  nota: number;
  descricao: string;
}

export interface IObterTodasAvaliacoes {
  jogo: string;
}

const initAvaliacaoContoller = () => {
  const criarAvaliacao = async ({
    jogoId,
    nota,
    descricao,
  }: ICriarAvaliacao): Promise<IControllerResponse<AvaliacaoModel>> => {
    const avaliacao = await Avaliacao.create({
      jogoId,
      nota,
      descricao,
    });

    return {
      status: 200,
      mensagem: 'Avaliacao criada',
      data: avaliacao.toJSON(),
    };
  };

  const obterTodasAvaliacoes = async ({
    jogo,
  }: IObterTodasAvaliacoes): Promise<IControllerResponse<AvaliacaoModel[]>> => {
    const avaliacoes: AvaliacaoModel[] = await Avaliacao.find({
      jogo,
    });

    return {
      status: 200,
      mensagem: 'Avaliacoes obtidas',
      data: avaliacoes,
    };
  };

  return { criarAvaliacao, obterTodasAvaliacoes };
};

export default initAvaliacaoContoller;
