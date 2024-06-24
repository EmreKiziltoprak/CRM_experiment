// Import necessary modules
import { NextFunction, Request, Response } from 'express';
import { ErrorName, ErrorData, CustomError, isCustomError } from './errorCodes';
import logger from '../logger'; // Assuming a logger is configured
import { v4 as uuidv4 } from 'uuid';
import { ExpressErrorMiddlewareInterface, HttpError, Middleware } from 'routing-controllers';
import { Service } from 'typedi';

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
const errorHandler = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  debugger;
  const isProduction = process.env.NODE_ENV === 'production';
  let statusCode = 500;
  let responseData: ErrorData<ErrorName>;

  if (isCustomError(err)) {
    // If the error is a custom error instance
    statusCode = err.statusCode;
    responseData = { statusCode: statusCode, errorName: err.error, message: err.message, data: err.data };
  } else {
    // If the error is not a custom error instance
    const errorId = uuidv4(); // Generate a unique error ID
    await logger.error({ // Await logging operation
      id: errorId,
      message: err.message,
      stack: err.stack,
      req: { url: req.url, method: req.method, headers: req.headers },
      additionalInfo: "An unexpected error occurred."
    }); // Log unexpected errors with error ID and details

    responseData = {
      statusCode: statusCode,
      errorName: ErrorName.INTERNAL_ERROR,
      message: isProduction ? 'Internal Server Error' : 'An unexpected error occurred.',
    };

    // Send standardized error response
    res.status(statusCode).json(responseData);
    return;

  }

};

@Middleware({ type: 'after' })
@Service() // Add the @Service decorator here
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {

  
  async error(error: any, request: Request, response: Response, next: NextFunction) {

    if (response.headersSent) {
      // If they were, log an error or do some other handling, but don't send a new response
      console.error('Error after headers were sent:', error);
      return; 
  }

  
    const isProduction = process.env.NODE_ENV === 'production';
    let statusCode = 500;
    let responseData: ErrorData<ErrorName>;

    if (isCustomError(error)) {
      statusCode = error.statusCode;
      responseData = { statusCode: error.statusCode, errorName: error.error, message: error.message, data: error.data };
    } else if (error instanceof HttpError) {
      // Handle HttpError from routing-controllers
      statusCode = error.httpCode;
      responseData = { statusCode: statusCode, errorName: ErrorName.INTERNAL_ERROR, message: error.message }; // Customize if needed
    } else {
      const errorId = uuidv4();
      await logger.error({
        id: errorId,
        message: error.message,
        stack: error.stack,
        req: { url: request.url, method: request.method, headers: request.headers },
        additionalInfo: "An unexpected error occurred."
      });

      responseData = {
        statusCode: statusCode,
        errorName: ErrorName.INTERNAL_ERROR,
        message: isProduction ? 'Internal Server Error' : 'An unexpected error occurred.'
      };
    }

    response.status(statusCode).json(responseData);
  }
}


export { globalErrorLogger, errorHandler };

/* 
"error": {
    "code": 404,
    "message": "Not Found",
    "details": "The requested resource could not be found."
  }
*/