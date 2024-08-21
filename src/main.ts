import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  BadRequestException,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { CustomExceptionFilter } from './shared/Filters/custom-exception.filter';
import { Console, error } from 'console';
import { ValidationError } from 'class-validator';
import { ApiResponse } from './shared/models/api-response.model';
import { ApiResponseInterceptor } from './shared/interceptors/api-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle('Finance Manager API')
    .setDescription('Manage all expenses')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document, {
    jsonDocumentUrl: 'swagger/json',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      stopAtFirstError: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const result = errors.flatMap((error: ValidationError) => {
          const constraintKey = Object.keys(error.constraints);
          return {
            message: error.constraints[constraintKey[0]],
          };
        });

        const error = Object.keys(result)
          .map((key) => {
            return `- ${result[key]['message']}.`;
          })
          .join('\n ');

        return new BadRequestException(error);
      },
    }),
  );

  app.useGlobalInterceptors(new ApiResponseInterceptor());

  app.useGlobalFilters(new CustomExceptionFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
