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

    let ex: ApiResponse<any> = {
      title: 'Error',
      code: response.statusCode,
    };

    switch (statusCode) {
      case HttpStatus.BAD_REQUEST:
        ex.message = exception.message;
        break;
      case HttpStatus.UNAUTHORIZED:
        ex.code = HttpStatus.UNAUTHORIZED;
        ex.message = 'This user needs to be validated first';
        break;
      case HttpStatus.FORBIDDEN:
        ex.code = HttpStatus.FORBIDDEN;
        ex.message =
          'This user does not have the require permissions to access this resource';
        break;
      case HttpStatus.NOT_FOUND:
        ex.message = 'The resource you requested cannot be found';
        break;
      case HttpStatus.REQUEST_TIMEOUT:
        ex.message = 'The request took to long...';
        break;
      default:
        ex.message = 'Something went wrong';
        break;
    }

    response.status(statusCode).json(ex);
  }
}
