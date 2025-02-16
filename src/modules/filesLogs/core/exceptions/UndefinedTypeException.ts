export class UndefinedTypeException extends Error {
  constructor() {
    super(
      "El parámetro type no está definido o es incorrecto. Debe ser LEAD o CENDEU."
    );
    this.name = "UndefinedTypeException";
  }
}
