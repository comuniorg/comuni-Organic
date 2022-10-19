import { Controller, HttpStatus } from "@nestjs/common";
import { HttpCode } from "@nestjs/common/decorators/http/http-code.decorator";
import { Delete, Get, Post, Put } from "@nestjs/common/decorators/http/request-mapping.decorator";
import { Body, Param } from "@nestjs/common/decorators/http/route-params.decorator";
import { ParseIntPipe } from "@nestjs/common/pipes/parse-int.pipe";
import { Categoria } from "../entities/categoria.entity";
import { categoriaService } from "../services/categoria.service";


/**
 * A classe controller irá controlar a classe Produto e ocorrerá aqui a implementação de métodos que responderão
 * a requisições de orientação (HTTP Request). 
 * 
 * @Controller - Decorador que indicara que a classe é do tipo RestController e será composto por 
 * URL, Verbo (referenciando qual HTTP será utilizado), RequestBody e como repsosta o controller retornar o código de HTTP Status
 */
@Controller('/categoria')
export class CategoriaController{
    constructor (private readonly categoriaService: categoriaService) {}

/**
 * @Get - Responsável pela busca do elemento solicitado pelo usuário, no banco de dados
 * @desc - Este @Get está responsavel pela entrega de todos elementos
 * 
 * findAll() - Função criada para vizualizar todos os elementos da tabela, iniciada através do verbo @Get
 */

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Categoria[]>{
        return this.categoriaService.findAll();
    }

/**
 * @desc - Este @Get está responsavel por entregar o elemento pelo Id
 * 
 * findById() - Função criada para vizualizar os elementos da tabela a partir do id, iniciada através do verbo @Get
 * 
 * @Param - referenciará o objeto e prometerá através do Promise a classe de refencia; 
 */
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(
        @Param('id', ParseIntPipe)
        id: number
    ): Promise<Categoria>{
        return this.categoriaService.findById(id);
    }

/**
 * @desc - Este @Get está responsavel por entregar o elemento pelo nome
 * 
 * findByNome() - Função criada para vizualizar os elementos da tabela a partir do nome
 */

    @Get('/categoria/:categoria')
    @HttpCode(HttpStatus.OK)
    findByNome(
        @Param('categoria')categoria: string): Promise<Categoria[]>{
            return this.categoriaService.findByNome(categoria);
        }
    

/**
 * @Post - Irá criar um elemento novo a partir do Json, que enviará para ao banco de dados
 * 
 * create - Utilizará o verbo @Post para criar um elemento na tabela no corpo do Json (Body)
 */
    @Post()
    @HttpCode(HttpStatus.OK)
    create(
        @Body()
        categoria: Categoria
    ): Promise<Categoria>{
        return this.categoriaService.create(categoria);
    }

/** 
 * @Put - Atualizará um elemento do banco de dados a partir do Json 
 * 
 * update - Utilizará o verbo @Put para atualizar um elemento na tabela no corpo do Json (Body)
 */
    @Put()
    @HttpCode(HttpStatus.OK)
    update(
        @Body()
        categoria: Categoria
    ): Promise<Categoria>{
        return this.categoriaService.update(categoria);
    }

/**
 * @Delete - Apagará um elemento do banco de dados a partir do id 
 * 
 * delete - É uma função criada que utilizará o @Delete para apagar um elemento pelo Id
 * 
 * ParseIntPipe - Pegará o padrão String e transformará em inteiro 
 */ 
    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(
        @Param('id', ParseIntPipe)
        id: number
    ){
        return this.categoriaService.delete(id)
    }
}