import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Bcrypt } from "../auth/bcrypt/bcrypt";
import { CategoriaController } from "./controllers/categoria.controller";
import { Categoria } from "./entities/categoria.entity";
import { categoriaService } from "./services/categoria.service";

/**
 * @desc
 * no module são definidas as estrutudas de dados, relacionamentos e dependencias.
 * as classes entidade, service e controller devem estar registradas no module.
 */
@Module({
    controllers: [CategoriaController],
    exports: [TypeOrmModule],
    imports: [TypeOrmModule.forFeature([Categoria])],
    providers: [categoriaService, Bcrypt],
})

export class CategoriaModule {};