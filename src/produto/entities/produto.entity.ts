import { IsNotEmpty } from "class-validator";
import { Categoria } from "src/categoria/entities/categoria.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'tb_produto'})
export class Produto{
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column({length: 45, nullable: false})
    nome: string;

    @IsNotEmpty()
    @Column({nullable: false})
    quantidade: number;

    @IsNotEmpty()
    @Column({nullable: false})
    data_ven: Date;

    @IsNotEmpty()
    @Column({nullable: false})
    preco: number;

    @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
        onDelete: 'CASCADE'
    })
    categoria: Categoria;
}