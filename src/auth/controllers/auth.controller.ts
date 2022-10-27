import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";



@Controller ('/auth')
export class AuthController {
    constructor (private authService: AuthService){}

    @UseGuards(LocalAuthGuard)
    @HttpCode (HttpStatus.OK)
    @Post ('/logar')
    async login (@Body() user: Usuariologin) : Promise<any>{
        return this.authService.login(user);
    }
}