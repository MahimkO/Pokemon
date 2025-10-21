/* DTO — это класс или интерфейс, который описывает структуру данных, которые приходят от клиента или уходят в ответе.
В Nest.js DTO обычно используется для валидации, типизации входящих данных и отбрасывания лишних полей */

import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
