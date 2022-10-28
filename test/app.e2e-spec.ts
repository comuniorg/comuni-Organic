import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('Testes dos Módulos Usuários e Auth (e2e)', () => {
  let token: any;
  let usuarioId: any;
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: 'root',
          database: 'db_organica_test',
          autoLoadEntities: true,
          synchronize: true,
          logging: false,
          dropSchema: true
        }),
        AppModule
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('01 - Deve cadastrar o Usuario', async () => {
    const resposta = await request(app.getHttpServer())
      .post('/usuarios/cadastrar')
      .send({
        nome: 'Root',
        usuario: 'root@root.com',
        senha: 'rootroot',
        foto: ' '
      });
      expect(HttpStatus.OK)

      usuarioId = resposta.body.id
  });

  it('02 - Deve autentificar Usuário (login)', async () =>{
    const resposta = await request(app.getHttpServer())
    .post('/auth/logar')
    .send({
      usuario: 'root@root.com',
      senha: 'rootroot'
    });
    expect(HttpStatus.OK)

    token = resposta.body.id
  });

  it('03 - Não deve duplicar o Usuario', async () => {
    request(app.getHttpServer())
    .post('/usuarios/cadastrar')
    .send({
      nome: 'Root',
      usuario: 'root@root.com',
      senha: 'rootroot',
      foto: ' '
    });
    expect(HttpStatus.BAD_REQUEST);
  });

  it('04 - Deve listar todos os Usuarios', async () =>{
    request(app.getHttpServer())
      .get('/usuarios/all')
      .set('Authorization', `${token}`)
      .send({})
    expect(HttpStatus.OK)
  });

  it('05 - Deve atualizar o Usuario', async () => {
    request(app.getHttpServer())
    .put('/usuarios/atualizar')
    .set('Authorization', `${token}`)
    .send({
      id: usuarioId,
      nome: 'Root Atualizado',
      usuario: 'root@root.com',
      senha: 'rootroot',
      foto: ' '
    })
    .then(resposta => {
      expect('Root Atualizado').toEqual(resposta.body.name)
    })
    expect(HttpStatus.OK)
  });
});
