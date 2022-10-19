import { IsNotEmpty } from "class-validator";
import { Categoria } from "src/categoria/entities/categoria.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


/**
 * A Classe Entidade : Referencial de objetos presentes no banco de dados. Será utilizada pelo TypeORM 
 * para criar as tabelas no banco de dados.
 * @Entity  - Decorador 
 * Irá gerar uma tabela no Banco de dados, utilizando como refêncial a classe produto. (tb_produto)
 */ 

@Entity({name: 'tb_produto'})
export class Produto{

/**
* @PrimaryGeneratedColumn - Gerará a chave primária (id) da classe produto dentro do banco de dados.  
*/
    @PrimaryGeneratedColumn()
    id: number;

/**
 *@Column - São as especifidades das colunas criadas dentro da classe, aqui produto. 
 */

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
    @Column({type: 'decimal', precision: 7, scale: 2, nullable: false})
    preco: number;

/**
* @ManytoOne - Decorador que irá realizar a ligação entre tabelas no banco de dados, ou seja, criará a chave estrangeira
 * Esse decorador em específico sinaliza uma ligação de n:1, aqui entre (produto e categoria) 
 */
    @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
        onDelete: 'CASCADE'
    })
    categoria: Categoria;
}