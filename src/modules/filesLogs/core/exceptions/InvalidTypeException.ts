export class InvalidTypeException extends Error {
  constructor() {
    super("Tipo de archivo inválido. El archivo debe ser de tipo LEAD o CENDEU.");
    this.name = "InvalidTypeException";
  }
}
