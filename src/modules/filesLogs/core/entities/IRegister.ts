export default interface IRegister {
  file_name?: string;
  period?: string;
  status?: boolean;
  processed_rows?: number;
  fail_rows?: number;
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
