// Import necessary modules
import { v4 as uuidv4 } from 'uuid'

// Define error code metadata
interface ErrorNameMetadata {
  description: string
  httpStatus: number
}

// Enumerate error codes with metadata
enum ErrorName {
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
const errorCodeMetadata: Record<ErrorName, ErrorNameMetadata> = {
  [ErrorName.INTERNAL_ERROR]: {
    description: 'Internal Server Error',
    httpStatus: 500,
  },
  [ErrorName.UNAUTHORIZED]: { description: 'Unauthorized', httpStatus: 401 },
  [ErrorName.DATABASE_ERROR]: {
    description: 'Database Error',
    httpStatus: 500,
  },
  [ErrorName.NOT_FOUND]: { description: 'Not Found', httpStatus: 404 },
  [ErrorName.VALIDATION_ERROR]: {
    description: 'Validation Error',
    httpStatus: 400,
  },
  [ErrorName.FORBIDDEN]: { description: 'Forbidden', httpStatus: 403 },
  [ErrorName.CONFLICT]: { description: 'Conflict', httpStatus: 409 },
  [ErrorName.BAD_REQUEST]: { description: 'Bad Request', httpStatus: 400 },
  [ErrorName.RATE_LIMIT_EXCEEDED]: {
    description: 'Rate Limit Exceeded',
    httpStatus: 429,
  },
  [ErrorName.SERVICE_UNAVAILABLE]: {
    description: 'Service Unavailable',
    httpStatus: 503,
  },
}

// Define the error data types for each error code explicitly
type ErrorDataMap = {
  [K in ErrorName]: { message: string; [key: string]: any }
}

// The error data interface using a generic type parameter
interface ErrorData<T extends ErrorName> {
  //comes from error enum
  errorName: T

  //status code for error like 400
  statusCode: number

  message: string

  //custom data related with error enum
  data?: ErrorDataMap[T]
}

// Custom error class with enhanced type safety
class CustomError<T extends ErrorName> extends Error {
  //error name from ErrorName enum type like 'INTERNAL_ERROR'
  readonly error: T

  //message from errorCodeMetadata like 'Internal Server Error'
  readonly message: string

  //optional error data related with error name enum  'INTERNAL_ERROR'
  readonly data?: ErrorDataMap[T]

  //unique error id created with uuidv4
  readonly id: string

  //statuscode like 400
  readonly statusCode: number

  constructor(error: T, message?: string, data?: ErrorDataMap[T]) {
    super(message)
    this.error = error
    this.message = errorCodeMetadata[error].description
    this.data = data
    this.id = uuidv4()
    this.statusCode = errorCodeMetadata[error].httpStatus
    Object.setPrototypeOf(this, new.target.prototype) // Maintain prototype chain
  }

  static fromError(err: any): CustomError<ErrorName.INTERNAL_ERROR> {
    return new CustomError(ErrorName.INTERNAL_ERROR, err.message)
  }
}

// Type Guard for CustomError
function isCustomError(error: any): error is CustomError<ErrorName> {
  return error instanceof CustomError
}

// Export necessary components
export {
  ErrorName,
  ErrorNameMetadata,
  ErrorData,
  ErrorDataMap,
  errorCodeMetadata,
  CustomError,
  isCustomError,
}
