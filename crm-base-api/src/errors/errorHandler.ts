// src/errors/errorHandler.ts

// Import necessary modules
import { NextFunction, Request, Response } from 'express';
import { ErrorCode, ErrorData, errorCodeMetadata, CustomError, isCustomError } from './errorCodes';
import logger from '../logger'; // Assuming a logger is configured
import { v4 as uuidv4 } from 'uuid';

// Error Logging Middleware to log unhandled errors globally
const globalErrorLogger = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorId = uuidv4(); // Generate a unique error ID
  logger.error(
    `Error ID: ${errorId} - ${err.message}`, // Include error ID and message
    { stack: err.stack, req: { url: req.url, method: req.method, headers: req.headers } } // Include error stack and request details
  );
  next(err);
};

// Error Handling Middleware
const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isProduction = process.env.NODE_ENV === 'production';
  let statusCode = 500;
  let responseData: ErrorData<ErrorCode>;

  if (isCustomError(err)) {
    // If the error is a custom error instance
    statusCode = err.statusCode;
    responseData = { code: err.code, message: err.message, data: err.data };
  } else {
    // If the error is not a custom error instance
    const errorId = uuidv4(); // Generate a unique error ID
    logger.error({
      id: errorId,
      message: err.message,
      stack: err.stack,
      req: { url: req.url, method: req.method, headers: req.headers },
      additionalInfo: "An unexpected error occurred."
    }); // Log unexpected errors with error ID and details

    responseData = {
      code: ErrorCode.INTERNAL_ERROR,
      message: isProduction ? 'Internal Server Error' : 'An unexpected error occurred.',
    };
  }

  // Send standardized error response
  res.status(statusCode).json(responseData);
};

export { globalErrorLogger, errorHandler };
