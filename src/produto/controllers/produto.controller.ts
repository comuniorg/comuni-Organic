import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth-guard";
import { Produto } from "../entities/produto.entity";
import { ProdutoService } from "../services/produto.service";

/**
 * A classe controller irá controlar a classe Produto e ocorrerá aqui a implementação de métodos que responderão
 * a requisições de orientação (HTTP Request). 
 * 
 * @Controller - Decorador que indicara que a classe é do tipo RestController e será composto por 
 * URL, Verbo (referenciando qual HTTP será utilizado), RequestBody e como repsosta o controller retornar o código de HTTP Status
 */
@UseGuards(JwtAuthGuard) // verifica se a parte do token esta correta
@Controller('/produto')
export class ProdutoController{
    constructor (private readonly produtoService: ProdutoService) {}

/**
 * @Get - Responsável pela busca do elemento solicitado pelo usuário, no banco de dados
*/
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Produto[]>{
        return this.produtoService.findAll();
    }

/**
 *@Get responsavel por entregar o elemento pelo Id
 * 
 * @Param - referenciará o objeto e prometerá através do Promise a classe de refencia; 
 */
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(
        @Param('id', ParseIntPipe)
        id: number
    ): Promise<Produto>{
        return this.produtoService.finById(id);
    }

/**
 * @desc - Este @Get está responsavel por entregar o elemento pelo nome
*/

    @Get('produto/:produto')
    @HttpCode(HttpStatus.OK)
    findByNome(
        @Param('produto')produto: string): Promise<Produto[]>{
            return this.produtoService.findByNome(produto);
    }

/**
 * @Post - Irá criar um elemento novo a partir do Json, que enviará para ao banco de dados
 */
    @Post()
    @HttpCode(HttpStatus.OK)
    create(
        @Body()
        produto: Produto
    ): Promise<Produto>{
        return this.produtoService.create(produto);
    }

 /** 
 * @Put - Atualizará um elemento do banco de dados a partir do Json 
 */
    @Put()
    @HttpCode(HttpStatus.OK)
    update(
        @Body()
        produto: Produto
    ): Promise<Produto>{
        return this.produtoService.update(produto);
    }

/**
 * @Delete - Apagará um elemento do banco de dados a partir do id 
 * 
 * ParseIntPipe - Pegará o padrão String e transformará em inteiro 
 */ 
    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(
        @Param('id', ParseIntPipe)
        id: number
    ){
        return this.produtoService.delete(id);
    }
}
