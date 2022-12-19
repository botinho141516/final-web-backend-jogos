import { NextFunction, Request, Response } from 'express';
import jwt, { IJWTDecodedData } from '../services/jwt.service';

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (
      (req.url.includes('/jogo') && req.method === 'POST') ||
      (req.url.includes('/avaliacao') && req.method === 'POST')
    ) {
      const bearerToken = req.headers.authorization as string;
      const [, token] = bearerToken.split('Bearer ');
      if (jwtVerify(token)) {
        return next();
      }
    }
    return next();
  } catch (err) {
    return res.sendStatus(401);
  }
};

const jwtVerify = (bearerToken: string): boolean => {
  if (!bearerToken) {
    throw new Error(
      'Token não informado. Por favor, informe o token no cabeçalho da requisição.'
    );
  }

  const decoded = jwt.decrypt(bearerToken) as IJWTDecodedData;

  if (Date.now() >= decoded.exp * 1000) {
    throw new Error('Falha na autenticação, por favor renove seu token.');
  }

  return true;
};
