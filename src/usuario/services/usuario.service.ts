import { Injectable } from "@nestjs/common/decorators";
import { HttpStatus } from "@nestjs/common/enums";
import { HttpException } from "@nestjs/common/exceptions";
import { InjectRepository } from "@nestjs/typeorm";
import { Bcrypt } from "../../auth/bcrypt/bcrypt";
import { Repository } from "typeorm";
import { Usuario } from "../entities/usuario.entity";

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
        private bcrypt: Bcrypt
    ){}

    async findByUsuario(usuario: string): Promise<Usuario | undefined>{
        return await this.usuarioRepository.findOne({
            where: {
                usuario: usuario
            }
        })
    }

    async findAll(): Promise<Usuario[]>{
        return await this.usuarioRepository.find(
            {
                relations:{
                    produto: true
                }
            }
        );
    }

    async findById(id: number): Promise<Usuario>{
        let usuario = await this.usuarioRepository.findOne({
            where:{
                id,
            },
            relations:{
                produto: true
            }
        });
        if(!usuario)
            throw new HttpException('Usuário não encontrado!',HttpStatus.NOT_FOUND);
        return usuario;
    }

    async create(usuario: Usuario): Promise<Usuario>{
        let buscaUsuario = await this.findByUsuario(usuario.usuario);

        if(!buscaUsuario){
            usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha)
            return await this.usuarioRepository.save(usuario);
        }
        throw new HttpException("O usuário (e-mail) já existe!", HttpStatus.BAD_REQUEST);
    }

    async update(usuario: Usuario): Promise<Usuario>{
        let updateUsuario: Usuario = await this.findById(usuario.id);
        let buscaUsuario = await this.findByUsuario(usuario.usuario);

        if(!updateUsuario)
            throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);

        if(buscaUsuario && buscaUsuario.id !== usuario.id)
            throw new HttpException('O usuário (e-mail) já existe!', HttpStatus.BAD_REQUEST);

        usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha)
        return await this.usuarioRepository.save(usuario);
    }
}