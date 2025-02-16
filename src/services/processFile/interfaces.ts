import { RequestHandler } from "express";

export interface IFileManaging {
  uploadSingle: (fileName: string) => RequestHandler;
}
