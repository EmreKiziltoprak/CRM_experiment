import { CustomError, ErrorData, ErrorDataMap, ErrorName } from '../errorCodes'

// Example variable using ErrorDataMap type
const validationErrorData: ErrorDataMap[ErrorName.VALIDATION_ERROR] = {
  message: 'Validation failed',
  field: 'email',
  reason: 'Email already exists',
}

// Specific error classes for different error types
export class ValidationError extends CustomError<ErrorName.VALIDATION_ERROR> {
  constructor(
    message?: string,
    data: ErrorDataMap[ErrorName.VALIDATION_ERROR] = validationErrorData,
  ) {
    super(ErrorName.VALIDATION_ERROR, message, data)
  }
}
