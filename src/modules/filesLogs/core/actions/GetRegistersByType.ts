import IRegister from "../entities/IRegister";
import { IResponsePaginatedRegister } from "../entities/IResponsePaginatedRegister";
import { UndefinedTypeException } from "../exceptions/UndefinedTypeException";
import { IFileLoadRepository } from "../repository/IFileLoadRepository";

export interface IGetRegistersByTypeAction {
  execute: (type: any, page?: any, size?: any) => Promise<IResponsePaginatedRegister>;
}
export const GetRegistersByTypeAction = (
  fileRepository: IFileLoadRepository
): IGetRegistersByTypeAction => {
  return {
    execute(type, page?, size?) {
      return new Promise(async (resolve, reject) => {
        try {
          if (!type) throw new UndefinedTypeException()
          const register = await fileRepository.getRegistersByType(type, page, size);
          resolve(register);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
