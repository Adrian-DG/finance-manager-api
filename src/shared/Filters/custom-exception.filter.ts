import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiResponse } from '../models/api-response.model';

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const request = context.getRequest<Request>();
    const response = context.getResponse<Response>();
    const statusCode = exception.getStatus();

    const ex: ApiResponse<any> = {
      title: 'Error',
      message: this.getMessage(statusCode, exception),
      code: statusCode,
      status: false,
      data: null,
    };

    response.status(statusCode).json(ex);
  }

  getMessage(statusCode: number, exception: HttpException): string {
    switch (statusCode) {
      case HttpStatus.BAD_REQUEST:
        return exception.message;
      case HttpStatus.UNAUTHORIZED:
        return 'This user needs to be validated first';
      case HttpStatus.FORBIDDEN:
        return 'This user does not have the require permissions to access this resource';
      case HttpStatus.NOT_FOUND:
        return 'The resource you requested cannot be found';
      case HttpStatus.REQUEST_TIMEOUT:
        return 'The request took to long...';
      default:
        return 'Something went wrong';
    }
  }
}
