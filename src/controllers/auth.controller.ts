import bcrypt from 'bcrypt';
import Usuario, { UsuarioModel } from '../database/models/usuario.model';
import { IControllerResponse } from '../interfaces/controller.interface';
import Jwt from '../services/jwt.service';

export interface IRegistrar {
  email: string;
  nome: string;
  senha: string;
}

export interface ILogin {
  email: string;
  senha: string;
}

export interface ILoginResponse {
  access_token: string;
}

const initAuthContoller = () => {
  const registrar = async ({
    email,
    nome,
    senha,
  }: IRegistrar): Promise<IControllerResponse<UsuarioModel>> => {
    const senhaHasheada = await bcrypt.hash(senha, 10);

    const usuario = await Usuario.create({ email, nome, senha: senhaHasheada });

    return {
      status: 201,
      mensagem: 'Cadastro efetuado',
      data: usuario.toJSON(),
    };
  };

  const login = async ({
    email,
    senha,
  }: ILogin): Promise<IControllerResponse<ILoginResponse>> => {
    const usuario = await Usuario.findOne({ email });

    if (!usuario)
      return {
        status: 404,
        mensagem: 'Usuário ou senha incorretos',
        data: null,
      };

    const senhaConfere = await bcrypt.compare(senha, usuario.senha);

    if (!senhaConfere) {
      return {
        status: 404,
        mensagem: 'Usuário ou senha incorretos',
        data: null,
      };
    }

    const jwt = Jwt.generate({
      email: usuario._id,
    });

    return {
      status: 200,
      mensagem: 'Login efetuado',
      data: {
        access_token: jwt,
      },
    };
  };

  return { registrar, login };
};

export default initAuthContoller;
