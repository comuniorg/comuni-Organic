import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsuarioService } from "../../usuario/services/usuario.service";
import { Bcrypt } from "../bcrypt/bcrypt";

/**
 *  indica que a classe é do tipo Service (Classe de Serviço), 
que pode ser Injetada em outras Classes através da Injeção de Dependências.
 */
@Injectable()
export class AuthService {
    constructor(
        private usuarioService: UsuarioService,
        private jwtService: JwtService,
        private bcrypt: Bcrypt
    ) {}
    
    /**
     * @disc Verfica e valida a entrada do usuario
     * @returns Um resultado caso a senha esteja certa
     */
    async validateUser(usarname: string, password: string): Promise<any> {
        const buscaUsuario = await this.usuarioService.findByUsuario(usarname);

        if (!buscaUsuario)
            throw new HttpException('Usuario não encontrado! ', HttpStatus.NOT_FOUND);

        const match = await this.bcrypt.compararSenhas(buscaUsuario.senha, password);

        if (buscaUsuario && match) {
            const { senha, ...result } = buscaUsuario;
            return result;
        }
        return null;
    }
    /**
     * @disc Loga o usuario no sistema
     * @returns Gera um token para que seja possivel fazer o login
     */
    async login(usuarioLogin: any) {
        const payload = {
            username: usuarioLogin.usuario,
            sub: 'comunidadeorganica'
        };
        return{
            usuario: usuarioLogin.usuario,
            token: `Bearer ${this.jwtService.sign(payload)}`
        }
    }
}