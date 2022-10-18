import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoriaController } from "./controllers/categoria.controller";
import { Categoria } from "./entities/categoria.entity";
import { categoriaService } from "./services/categoria.service";


@Module({
    controllers: [CategoriaController],
    exports: [TypeOrmModule],
    imports: [TypeOrmModule.forFeature([Categoria])],
    providers: [categoriaService],
})

export class CategoriaModule {};