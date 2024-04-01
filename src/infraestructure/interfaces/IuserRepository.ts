import { requestGenericPaginate } from "src/application/IResponse";
import { listUsersDto } from "src/application/dto/listUsersDto";

export interface IuserRepository{
    getAllUsers(payload: any): Promise<listUsersDto[]>;
}