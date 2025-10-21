import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // включаем автоматическую валидацию DTO
  // 'whitelist: true' - чтобы лишние поля автоматически отбрасывались
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors({
    origin: 'http://localhost:5173', // Vite поднимает фронт на этом порту
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
