import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { errorMiddleware } from './common/middleware/error.middleware';
import { SwaggerModule } from '@nestjs/swagger';
import * as YAML from 'yamljs';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(LoggerMiddleware);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  console.log(path.join(__dirname, '..', 'swagger.yml'));

  const swaggerPath = path.join(__dirname, '..', 'swagger.yml');
  try {
    const swaggerDocument = YAML.load(swaggerPath);
    SwaggerModule.setup('api/documentation', app, swaggerDocument, {
      swaggerOptions: { persistAuthorization: true, docExpansion: 'none' },
    });
  } catch (error) {
    console.error('Error loading Swagger YAML:', error);
  }

  app.use(errorMiddleware);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
