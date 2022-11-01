import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { Produto } from "../../produto/entities/produto.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name: "tb_usuarios"})
export class Usuario {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    public id: number;

    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    @ApiProperty()
    nome: string;

    @IsEmail()
    @Column({length: 255, nullable: false})
    @ApiProperty({example: 'email@email.com.br'})
    public usuario: string;

    @IsNotEmpty()
    @MinLength(8)
    @Column({length: 255, nullable: false})
    @ApiProperty()
    public senha: string;

    @Column({length: 5000})
    @ApiProperty()
    public foto: string;

    @ApiProperty()
    @OneToMany(() => Produto, (produto) => produto.usuario)
    produto: Produto[]
}