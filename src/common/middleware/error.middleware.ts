import { Request, Response, NextFunction } from 'express';

export function errorMiddleware(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(error, 'Error middleware');

  if (error && error.error && error.error.isJoi) {
    return res.status(422).json({
      success: false,
      status: 422,
      message: error.error.details[0].message,
    });
  }

  if (error.statusCode) {
    return res.status(error.statusCode).json({
      success: false,
      status: error.statusCode,
      message: error.message,
    });
  }

  return res.status(500).json({
    success: false,
    status: 500,
    message: 'Internal Server Error',
  });
}
