export class MissingParamsException extends Error {
  constructor() {
    super("La request necesita más parámetros de los enviados.");
    this.name = "MissingParamsException";
  }
}
