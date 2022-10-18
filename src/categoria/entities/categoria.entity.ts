import { IsNotEmpty } from "class-validator";
import { Produto } from "src/produto/entities/produto.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: 'tb_categoria'})
export class Categoria{
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column({length: 45, nullable: false})
    categoria: string;

    @IsNotEmpty()
    @Column({length: 200, nullable:false})
    localidade: string;

    @OneToMany(() => Produto, (produto) => produto.categoria, {
        onDelete: 'CASCADE'
    })
    produto: Produto;

    

}