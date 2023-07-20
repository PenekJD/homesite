import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

const FRONTEND_URI:string = process.env.FRONTEND_URI;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    allowedHeaders: ['content-type', 'authorization'],
    origin: FRONTEND_URI,
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(8000);
}
bootstrap();
