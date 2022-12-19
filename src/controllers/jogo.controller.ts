import Jogo, { JogoModel } from '../database/models/jogo.model';
import { IControllerResponse } from '../interfaces/controller.interface';
import { mongo } from 'mongoose';
import Desenvolvedor from '../database/models/desenvolvedor.model';

export interface ICriarJogo {
  nome: string;
  imagem?: string;
  resumo: string;
  desenvolvedor: string;
  generoId: string;
  consoleId: string;
}

export interface IObterTodosJogos {
  consoleId?: string;
  desenvolvedorId?: string;
  generoId?: string;
  nome?: string;
}

const initJogoController = () => {
  const criarJogo = async (params: ICriarJogo) => {
    const desenvolvedor = await Desenvolvedor.findOne({
      nome: params.desenvolvedor,
    });

    if (!desenvolvedor) {
      const desenvolvedor = await Desenvolvedor.create({
        nome: params.desenvolvedor,
      });

      const jogoCriado = await Jogo.create({
        ...params,
        desenvolvedorId: desenvolvedor.id,
      });

      return {
        status: 201,
        mensagem: 'Jogo criado',
        data: jogoCriado.toJSON(),
      };
    }
    const jogoCriado = await Jogo.create({
      ...params,
      desenvolvedorId: desenvolvedor.id,
    });

    return {
      status: 201,
      mensagem: 'Jogo criado',
      data: jogoCriado.toJSON(),
    };
  };

  const obterTodosJogos = async ({
    consoleId,
    desenvolvedorId,
    generoId,
    nome,
  }: IObterTodosJogos): Promise<IControllerResponse<JogoModel[]>> => {
    const findSemUndefined = JSON.parse(
      JSON.stringify({
        desenvolvedorId,
        consoleId,
        generoId,
        nome,
      })
    );
    const jogos: JogoModel[] = await Jogo.aggregate([
      {
        $match: findSemUndefined,
      },
      { $addFields: { generoId: { $toObjectId: '$generoId' } } },
      { $addFields: { consoleId: { $toObjectId: '$consoleId' } } },
      { $addFields: { desenvolvedorId: { $toObjectId: '$desenvolvedorId' } } },
      {
        $lookup: {
          from: 'avaliacoes',
          localField: '_id',
          foreignField: 'jogoId',
          as: 'avaliacoes',
        },
      },
      {
        $lookup: {
          from: 'generos',
          localField: 'generoId',
          foreignField: '_id',
          as: 'genero',
        },
      },
      {
        $lookup: {
          from: 'consoles',
          localField: 'consoleId',
          foreignField: '_id',
          as: 'console',
        },
      },
      {
        $lookup: {
          from: 'desenvolvedores',
          localField: 'desenvolvedorId',
          foreignField: '_id',
          as: 'desenvolvedor',
        },
      },
      {
        $set: {
          genero: { $first: '$genero' },
          console: { $first: '$genero' },
          desenvolvedor: { $first: '$desenvolvedor' },
        },
      },
      { $addFields: { notaMedia: { $avg: '$avaliacoes.nota' } } },
    ]).exec();

    return {
      status: 200,
      mensagem: 'Jogos obtidos',
      data: jogos,
    };
  };

  return {
    criarJogo,
    obterTodosJogos,
  };
};

export default initJogoController;
