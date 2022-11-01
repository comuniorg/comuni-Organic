import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
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


  const config = new DocumentBuilder()
  .setTitle('Comunidade Organica')
  .setDescription(' Projeto Comunidade Orgnanica')
  .setContact('Comunidade Organica', 'https://github.com/comuniorg', 'comuni.organacia@gmail.com')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

  const document = SwaggerModule.createDocument(app, config);
 

  SwaggerModule.setup('/swagger', app, document); //documentar o meu sistema dentro da rota swagger 


  process.env.TZ = '-3:00';
  

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(process.env.PORT || port );


}
bootstrap();
