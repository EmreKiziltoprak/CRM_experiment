// src/errors/errorCodes.ts

// Import necessary modules
import { v4 as uuidv4 } from 'uuid';

// Define error code metadata
interface ErrorCodeMetadata {
  description: string;
  httpStatus: number;
}

// Enumerate error codes with metadata
enum ErrorCode {
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  UNAUTHORIZED = 'UNAUTHORIZED',
  DATABASE_ERROR = 'DATABASE_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  FORBIDDEN = 'FORBIDDEN',
  CONFLICT = 'CONFLICT',
  BAD_REQUEST = 'BAD_REQUEST',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
}

// Define error code metadata mapping
const errorCodeMetadata: Record<ErrorCode, ErrorCodeMetadata> = {
  [ErrorCode.INTERNAL_ERROR]: { description: 'Internal Server Error', httpStatus: 500 },
  [ErrorCode.UNAUTHORIZED]: { description: 'Unauthorized', httpStatus: 401 },
  [ErrorCode.DATABASE_ERROR]: { description: 'Database Error', httpStatus: 500 },
  [ErrorCode.NOT_FOUND]: { description: 'Not Found', httpStatus: 404 },
  [ErrorCode.VALIDATION_ERROR]: { description: 'Validation Error', httpStatus: 400 },
  [ErrorCode.FORBIDDEN]: { description: 'Forbidden', httpStatus: 403 },
  [ErrorCode.CONFLICT]: { description: 'Conflict', httpStatus: 409 },
  [ErrorCode.BAD_REQUEST]: { description: 'Bad Request', httpStatus: 400 },
  [ErrorCode.RATE_LIMIT_EXCEEDED]: { description: 'Rate Limit Exceeded', httpStatus: 429 },
  [ErrorCode.SERVICE_UNAVAILABLE]: { description: 'Service Unavailable', httpStatus: 503 },
};

//  the error data types for each error code explicitly
type ErrorDataMap = {
  [K in ErrorCode]: { message: string; [key: string]: any }; // Allow additional properties specific to each error code
};

// the error data interface using a generic type parameter
interface ErrorData<T extends ErrorCode> {
  code: T;
  message: string;
  data?: ErrorDataMap[T]; // Retrieve error-specific data based on the code
}

// Custom error class with enhanced type safety
class CustomError<T extends ErrorCode> extends Error {
  readonly code: T;
  readonly data?: ErrorDataMap[T];
  readonly id: string;
  readonly statusCode: number;

  constructor(code: T, message: string, statusCode: number, data?: ErrorDataMap[T]) {
    super(message);
    this.code = code;
    this.data = data;
    this.id = uuidv4(); // Generate a unique error ID
    this.statusCode = statusCode;

    Object.setPrototypeOf(this, new.target.prototype); // Maintain prototype chain
  }

  static fromError(err: any): CustomError<ErrorCode.INTERNAL_ERROR> {
    return new CustomError(ErrorCode.INTERNAL_ERROR, err.message, 500);
  }
}



// Type Guard for CustomError
function isCustomError(error: any): error is CustomError<ErrorCode> {
  return error instanceof CustomError;
}

// Export necessary components
export {
  ErrorCode,
  ErrorCodeMetadata,
  ErrorData,
  errorCodeMetadata,
  CustomError,
  isCustomError,
};
