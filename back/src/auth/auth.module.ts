// Модуль связывает контроллер и сервис вместе

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [JwtModule.register({})], // зависимости (например, JwtModule, чтобы шифровать токены)
  controllers: [AuthController], // Модуль связывает всё вместе
  providers: [AuthService], // кто выполняет работу
})
export class AuthModule {}
