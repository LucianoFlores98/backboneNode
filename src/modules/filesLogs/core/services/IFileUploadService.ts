export interface IFileUploadService {
  upload(file: Express.Multer.File, type: string): Promise<string>;
  processFile(file: Express.Multer.File): Promise<boolean>;
  convertToBase64(path: string): Promise<string>;
}
