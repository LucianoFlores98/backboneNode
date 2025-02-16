export class InvalidPeriodException extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "InvalidPeriodException";
  }
}
