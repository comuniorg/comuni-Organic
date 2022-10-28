import { Module } from '@nestjs/common';
import { CategoriaModule } from './categoria/categoria.module';
import { Categoria } from './categoria/entities/categoria.entity';
import { Produto } from './produto/entities/produto.entity';
import { ProdutoModule } from './produto/produto.module';
import { Usuario } from './usuario/entities/usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';

/**
 * @desc O module são definidas as estrutudas de dados, relacionamentos e dependencias.
 * as classes entidade, service e controller devem estar registradas no module.
 */
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_organica',
      entities: [Produto, Categoria, Usuario],
      synchronize: true
    }),
/**
 * @desc as classes CategoriaModule e ProdutoModule são modulos que gerencia os services, controllers e entities.
 *  Ela é exportada para o app.module.
 */
      ProdutoModule,
      CategoriaModule,
      UsuarioModule,
      AuthModule
    ],
  controllers: [],
  providers: [],
})

/**
 * @desc a classe AppModule é um modulo que gerencia os services, controllers e entities.
 *  Ela é chamada pelo aquivo main e tem a função de chamar outros modulos.
 */
export class AppModule {}
