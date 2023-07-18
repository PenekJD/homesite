import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const FRONTEND_URI:string = process.env.FRONTEND_URI;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    allowedHeaders: ['content-type'],
    origin: FRONTEND_URI,
    credentials: true,
  });
  await app.listen(8000);
}
bootstrap();
