import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { map, Observable, tap } from 'rxjs';
import { ApiResponse } from 'src/shared/models/api-response.model';

@Injectable()
export class ApiResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const _context = context.switchToHttp();
    const _request = _context.getRequest<Request>();
    const _response = _context.getResponse<Response>();

    const { originalUrl, method, params, query, body } = _request;

    const response: ApiResponse<any> = {
      title: 'Ok',
      message: 'process was successfull',
      status: true,
      code: _response.statusCode,
    };

    return next.handle().pipe(
      map((res: unknown) => {
        return {
          ...response,
          data: res,
        };
      }),
    );
  }
}
