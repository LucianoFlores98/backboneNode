export class FileAlreadyExistsException extends Error {
    constructor(message: string) {
      super(message);
      this.name = "FileAlreadyExistsException";
    }
  }
  