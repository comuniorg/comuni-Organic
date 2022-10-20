import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaModule } from './categoria/categoria.module';
import { Categoria } from './categoria/entities/categoria.entity';
import { Produto } from './produto/entities/produto.entity';
import { ProdutoModule } from './produto/produto.module';

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
      entities: [Produto, Categoria],
      synchronize: true
    }),
/**
 * @desc as classes CategoriaModule e ProdutoModule são modulos que gerencia os services, controllers e entities.
 *  Ela é exportada para o app.module.
 */
      ProdutoModule, CategoriaModule],
  controllers: [],
  providers: [],
})

/**
 * @desc a classe AppModule é um modulo que gerencia os services, controllers e entities.
 *  Ela é chamada pelo aquivo main e tem a função de chamar outros modulos.
 */
export class AppModule {}
