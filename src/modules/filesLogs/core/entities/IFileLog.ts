import { FileTypeEnum } from "./FileTypeEnum";

export interface IFileLogOptional {
  file_name: string;
  type: FileTypeEnum;
  period: string;
  status: boolean;
  processed_rows: number;
  fail_rows: number;
  error_file_name: string;
  id: string;
  process_id: number;
  createdAt: Date;
  updatedAt: Date;
}
export type IFileLog = Partial<IFileLogOptional>;
