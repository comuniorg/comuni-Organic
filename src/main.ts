import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


/**
 * @desc
 * a função está criando uma porta para o sistema conseguir rodar.
 * também configurou o horário de brasilia, validation para rodar de forma global e Habilita que o computador
 * receba requisições de fora.
 */
async function bootstrap() {
  const port = 4000;

  const app = await NestFactory.create(AppModule);

  process.env.TZ = '-3:00';

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(port);
}
bootstrap();
