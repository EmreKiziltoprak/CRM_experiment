import { Response } from 'express';

interface ApiResponse<T> {
  statusCode: number;
  success: boolean;
  data: T;
  message?: string;
}

function sendSuccessResponse<T>(res: Response, data: T, message?: string, statusCode: number = 200): void {
  const response: ApiResponse<T> = {
    statusCode: statusCode,
    success: true,
    data,
    message,
  };
  res.status(statusCode).json(response);
}

export { sendSuccessResponse, ApiResponse };
