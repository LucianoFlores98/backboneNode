export class InvalidFileConversionException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidFileConversionException";
  }
}
