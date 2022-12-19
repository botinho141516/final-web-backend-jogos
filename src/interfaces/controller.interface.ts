export interface IControllerResponse<T> {
    status: number;
    mensagem: string;
    data: T | null;
}