// Это входная точка всех запросов, связанных с авторизацией.
// Контроллер не делает “логику”, он просто принимает запрос → передаёт данные в сервис → возвращает ответ.

import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service'; // подключаем сервис, где находится вся логика регистрации и входа.
import { RegisterDto } from './dto/register.dto'; // DTO (Data Transfer Object) описывают, какие поля мы ожидаем в запросах.
import { LoginDto } from './dto/login.dto'; // Nest.js будет автоматически валидировать тело запроса, если включён ValidationPipe

// Controller превращает класс в контроллер.
// Всё, что начинается с /auth/... будет направляться в этот контроллер (например, /auth/login)
@Controller('auth')
export class AuthController {
  // Через Dependency Injection (внедрение зависимостей) Nest автоматически создаёт экземпляр AuthService и передаёт его в контроллер.
  constructor(private authService: AuthService) {}

  // POST Указывает, что метод отвечает на HTTP-запрос типа POST (/auth/register)
  /* @Body() вытаскивает JSON из тела запроса и превращает его в объект класса RegisterDto.
    Nest передаёт dto в AuthService, который уже выполняет:
      - проверку, есть ли такой пользователь;
      - хэширование пароля (bcrypt);
      - запись в БД через Prisma;
      - создание JWT токенов;
      - возврат их клиенту */
  @Post('register')
  //dto используется для типизации данных (чтобы не писать '@Body() body: any' теперь мы точно знаем что к нам придёт)
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  // Аналогично регистрации
  // POST Указывает, что метод отвечает на HTTP-запрос типа POST (/auth/login)
  // @Body позволяет получить данные из тела запроса (например, JSON { email, password }).
  // Передаёт их в AuthService.login(), который проверяет пользователя и возвращает токены
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
