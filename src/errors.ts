export interface FieldError {
  path: (string | number)[];
  message: string;
  code: string;
}

export class ValidationError extends Error {
  public fieldErrors?: FieldError[];

  constructor(message: string, fieldErrors?: FieldError[]) {
    super(message);
    this.name = 'ValidationError';
    this.fieldErrors = fieldErrors;
  }
}

