import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ServerResponse } from '../models/server-response.model';

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const request = context.getRequest<Request>();
    const response = context.getResponse<Response>();
    const statusCode = exception.getStatus();

    let serverResp: ServerResponse = {
      title: 'Error',
      message: '',
      status: false,
      code: statusCode,
      path: request.path,
    };

    switch (statusCode) {
      case HttpStatus.BAD_REQUEST:
        serverResp.message = 'Request went wrong due to incorrect input';
        break;
      case HttpStatus.UNAUTHORIZED:
        serverResp.message = 'This user needs to be validated first';
        break;
      case HttpStatus.FORBIDDEN:
        serverResp.message =
          'This user does not have the require permissions to access this resource';
        break;
      case HttpStatus.NOT_FOUND:
        serverResp.message = 'The resource you requested cannot be found';
        break;
      case HttpStatus.REQUEST_TIMEOUT:
        serverResp.message = 'The request took to long...';
        break;
      default:
        serverResp.message = 'Something went wrong';
        break;
    }

    response.status(statusCode).json(serverResp);
  }
}
