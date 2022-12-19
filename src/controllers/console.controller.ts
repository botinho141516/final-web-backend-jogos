import Console, { ConsoleModel } from '../database/models/console.model';
import { IControllerResponse } from '../interfaces/controller.interface';

const initConsoleController = () => {
  const obterTodosConsoles = async (): Promise<
    IControllerResponse<ConsoleModel[]>
  > => {
    const consoles: ConsoleModel[] = await Console.find();

    return {
      status: 200,
      mensagem: 'Consoles obtidos',
      data: consoles,
    };
  };

  return {
    obterTodosConsoles,
  };
};

export default initConsoleController;
