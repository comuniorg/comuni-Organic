import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Bcrypt } from "../auth/bcrypt/bcrypt";
import { ProdutoController } from "./controllers/produto.controller";
import { Produto } from "./entities/produto.entity";
import { ProdutoService } from "./services/produto.service";

/**
 * @desc
 * no module são definidas as estrutudas de dados, relacionamentos e dependencias.
 * as classes entidade, service e controller devem estar registradas no module.
 */
@Module({
    controllers: [ProdutoController],
    exports: [TypeOrmModule],
    imports: [TypeOrmModule.forFeature([Produto])],
    providers: [ProdutoService, Bcrypt],
})

export class ProdutoModule {};