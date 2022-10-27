import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth-guard";
import { Usuario } from "../entities/usuario.entity";
import { UsuarioService } from "../services/usuario.service";


/**
 * 
 * O Usuário controller terá 3 métodos, o de consultar todos os cadastros, presente no @GET - protegido 
 * pelo @UseGuards, o segundo será o de cadastrar o usuário, no qual utilirá o método @Post e atualizar cadastro 
 * introduzido no método @Put. 
 */


@Controller('/usuarios')
export class UsuarioController {
    constructor (private readonly usuarioService: UsuarioService) {}



    @UseGuards (JwtAuthGuard)
    @Get('/all')
    @HttpCode (HttpStatus.OK)
    async findAll(): Promise<Usuario[]> {
        return await this.usuarioService.findAll();
    }

    @Post('/cadastrar')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() usuario: Usuario): Promise<Usuario>{
        return await this.usuarioService.create(usuario);
   
    }

    @UseGuards (JwtAuthGuard)
    @Put('/atualizar')
    @HttpCode(HttpStatus.OK)
    async update(@Body() usuario: Usuario): Promise<Usuario> {
        return await this.usuarioService.update(usuario);
    }
}
