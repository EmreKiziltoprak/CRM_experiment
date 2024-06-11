import { CustomError, ErrorData, ErrorName } from './errorCodes'

// Specific Error Classes (examples)
export class UnauthorizedError extends CustomError<ErrorName.UNAUTHORIZED> {
  constructor(message = 'Unauthorized') {
    super(ErrorName.UNAUTHORIZED, message)
  }
}

export class DatabaseError extends CustomError<ErrorName.DATABASE_ERROR> {
  constructor(message = 'Database Error') {
    super(ErrorName.DATABASE_ERROR, message)
  }
}

export class NotFoundError extends CustomError<ErrorName.NOT_FOUND> {
  constructor(message = 'Not Found') {
    super(ErrorName.NOT_FOUND, message)
  }
}
