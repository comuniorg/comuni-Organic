import { Controller, HttpStatus } from "@nestjs/common";
import { HttpCode } from "@nestjs/common/decorators/http/http-code.decorator";
import { Delete, Get, Post, Put } from "@nestjs/common/decorators/http/request-mapping.decorator";
import { Body, Param } from "@nestjs/common/decorators/http/route-params.decorator";
import { ParseIntPipe } from "@nestjs/common/pipes/parse-int.pipe";
import { Categoria } from "../entities/categoria.entity";
import { categoriaService } from "../services/categoria.service";


@Controller('/categoria')
export class CategoriaController{
    constructor (private readonly categoriaService: categoriaService) {}

 //Get - Encontrar todos

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Categoria[]>{
        return this.categoriaService.findAll();
    }

 //Get - Encontrar por ID

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(
        @Param('id', ParseIntPipe)
        id: number
    ): Promise<Categoria>{
        return this.categoriaService.findById(id);
    }

 //Get - Encontrar por nome

    @Get('/categoria/:categoria')
    @HttpCode(HttpStatus.OK)
    findByNome(
        @Param('categoria')categoria: string): Promise<Categoria[]>{
            return this.categoriaService.findByNome(categoria);
        }
    
 //Post - Criar

    @Post()
    @HttpCode(HttpStatus.OK)
    create(
        @Body()
        categoria: Categoria
    ): Promise<Categoria>{
        return this.categoriaService.create(categoria);
    }

 //Put - Atualizar categoria

    @Put()
    @HttpCode(HttpStatus.OK)
    update(
        @Body()
        categoria: Categoria
    ): Promise<Categoria>{
        return this.categoriaService.update(categoria);
    }

 //Delete - Deletar uma categoria
 
    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(
        @Param('id', ParseIntPipe)
        id: number
    ){}
}