import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { Produto } from "../entities/produto.entity";
import { ProdutoService } from "../services/produto.service";


@Controller('/produto')
export class ProdutoController{
    constructor (private readonly produtoService: ProdutoService) {}

 //Get - Encontrar tudo
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Produto[]>{
        return this.produtoService.findAll();
    }

 //Get - Encontrar por ID
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(
        @Param('id', ParseIntPipe)
        id: number
    ): Promise<Produto>{
        return this.produtoService.finById(id);
    }

 //Get - Encontrar por nome
    @Get('produto/:produto')
    @HttpCode(HttpStatus.OK)
    findByNome(
        @Param('produto')produto: string): Promise<Produto[]>{
            return this.produtoService.findByName(produto);
    }
    
 //Create - Criar
    @Post()
    @HttpCode(HttpStatus.OK)
    create(
        @Body()
        produto: Produto
    ): Promise<Produto>{
        return this.produtoService.create(produto);
    }

 //Put - Atualizar
    @Put()
    @HttpCode(HttpStatus.OK)
    update(
        @Body()
        produto: Produto
    ): Promise<Produto>{
        return this.produtoService.update(produto);
    }

 //Delete - Deletar
    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(
        @Param('id', ParseIntPipe)
        id: number
    ){
        return this.produtoService.delete(id);
    }
}