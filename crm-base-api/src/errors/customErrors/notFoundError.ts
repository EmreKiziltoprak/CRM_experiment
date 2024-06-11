import { CustomError, ErrorData, ErrorDataMap, ErrorName } from '../errorCodes'

// Example variable using ErrorDataMap type
const validationErrorData: ErrorDataMap[ErrorName.NOT_FOUND] = {
  message: 'Not Found',
  field: 'not_found',
  reason: '',
}

// Specific error classes for different error types
export class ValidationError extends CustomError<ErrorName.NOT_FOUND> {
  constructor(
    message?: string,
    data: ErrorDataMap[ErrorName.NOT_FOUND] = validationErrorData,
  ) {
    super(ErrorName.NOT_FOUND, message, data)
  }
}
