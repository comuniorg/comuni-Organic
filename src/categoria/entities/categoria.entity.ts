import { IsNotEmpty } from "class-validator";
import { Produto } from "../../produto/entities/produto.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

/**
 * A Classe Entidade : Referencial de objetos presentes no banco de dados. Será utilizada pelo TypeORM 
 * para criar as tabelas no banco de dados.
 * @Entity  - Decorador 
 * Irá gerar uma tabela no Banco de dados, utilizando como refêncial a classe categoria. (tb_categoria)
 */ 

@Entity({name: 'tb_categoria'})
export class Categoria{

/**
* @PrimaryGeneratedColumn - Gerará a chave primária (id) da classe produto dentro do banco de dados.  
*/
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

/**
 *@Column - São as especifidades das colunas criadas dentro da classe, aqui produto. 
 */
    @IsNotEmpty()
    @Column({length: 45, nullable: false})
    @ApiProperty()
    categoria: string;

    @IsNotEmpty()
    @Column({length: 200, nullable:false})
    @ApiProperty()
    localidade: string;

/**
* @OneToMany - Decorador que irá realizar a ligação entre tabelas no banco de dados, ou seja, criará a chave estrangeira
 * Esse decorador em específico sinaliza uma ligação de 1:n, aqui entre (produto e categoria) 
 */
    @ApiProperty()
    @OneToMany(() => Produto, (produto) => produto.categoria, {
        onDelete: 'CASCADE'
    })
    produto: Produto;

    

}