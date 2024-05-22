import { CustomError, ErrorCode } from "./errorCodes";

// Specific Error Classes (examples)
export class UnauthorizedError extends CustomError<ErrorCode.UNAUTHORIZED> {
    constructor(message = 'Unauthorized') {
      super(ErrorCode.UNAUTHORIZED, message, 401);
    }
  }
  
  export class DatabaseError extends CustomError<ErrorCode.DATABASE_ERROR> {
    constructor(message = 'Database Error') {
      super(ErrorCode.DATABASE_ERROR, message, 500);
    }
  }
  
  export class NotFoundError extends CustomError<ErrorCode.NOT_FOUND> {
    constructor(message = 'Not Found') {
      super(ErrorCode.NOT_FOUND, message, 404);
    }
  }
  
  export class ValidationError extends CustomError<ErrorCode.VALIDATION_ERROR> {
    constructor(message = 'Validation Error') {
      super(ErrorCode.VALIDATION_ERROR, message, 400);
    }
  }