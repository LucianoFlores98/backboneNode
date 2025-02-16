import { format } from "date-fns";
import { pythonServiceGetRucFile } from "../../../../constants/api";
import { IHttpClient } from "../../../../services/httpClient/interfaces";

export interface IGetRucFileActionByName {
  execute: (fileName: string) => Promise<any>;
}
export const GetRucFileActionByName = (
  httpClientService: IHttpClient
): IGetRucFileActionByName => {
  return {
    execute(period) {
      return new Promise(async (resolve, reject) => {
        try {
          const rucFileResponse = await httpClientService.get(
            pythonServiceGetRucFile,
            { period }
          );
          if (rucFileResponse.status === "error") {
            return reject(rucFileResponse.error);
          }
          resolve(rucFileResponse.data.result);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
