import { BaseErrorData } from "./base-error-data";

export class BaseError extends Error {
  code: string;
  message: string;
  status: number;

  constructor({ code, message, status }: BaseErrorData) {
    super(message);
    this.code = code;
    this.status = status;
  }

  toString() {
    const error = { status: this.status, code: this.code, message: this.message };
    return JSON.stringify(error);
  }
}
