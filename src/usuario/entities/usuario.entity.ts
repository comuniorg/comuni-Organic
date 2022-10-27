import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { Produto } from "../../produto/entities/produto.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "tb_usuarios"})
export class Usuario {
    @PrimaryGeneratedColumn()
    public id: number;

    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    nome: string;

    @IsEmail()
    @Column({length: 255, nullable: false})
    public usuario: string;

    @IsNotEmpty()
    @MinLength(8)
    @Column({length: 255, nullable: false})
    public senha: string;

    @Column({length: 5000})
    public foto: string;

    @OneToMany(() => Produto, (produto) => produto.usuario)
    produto: Produto[]
}