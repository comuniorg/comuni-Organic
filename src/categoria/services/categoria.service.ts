import { HttpStatus, Injectable } from "@nestjs/common";
import { HttpException } from "@nestjs/common/exceptions/http.exception";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Categoria } from "../entities/categoria.entity";

/**
 *  indica que a classe é do tipo Service (Classe de Serviço), 
que pode ser Injetada em outras Classes através da Injeção de Dependências.
 */
@Injectable()
export class categoriaService{
    constructor(
        @InjectRepository(Categoria)
        private categoriaRepository: Repository<Categoria>
    ) {}

    /**
     * @disc Consulta todos as categorias do banco de dados
     * @returns todos as categorias que estão no banco de dados
     */
    async findAll(): Promise<Categoria[]>{
        return await this.categoriaRepository.find();
    }

    /**
     * @disc Consulta a categoria por id
     * @param id Identificador para consultar a categoria por id
     * @returns A categoria com o id
     */
    async findById(id: number): Promise<Categoria>{
        let categoria = await this.categoriaRepository.findOne({
            where:{
                id
            }
        });

        if(!categoria)
            throw new HttpException('Categoria não encontrada!', HttpStatus.NOT_FOUND)
        return categoria;
    }


    /**
     * @disc Consulta a categoria por nome
     * @param categoria Identeificador para consultar a categoria por nome
     * @returns A categoria com o nome do identificador
     */
    async findByNome(categoria: string): Promise<Categoria[]>{
        return await this.categoriaRepository.find({
            where: {
                categoria: ILike(`%${categoria}%`)
            },
            relations: {
                produto: true
            }
        });
    }

     /**
     * @desc Cria uma nova Categoria
     * @param categoria Identificador para criar um nova categoria
     * @returns A categoria criado 
     */
    async create(categoria: Categoria): Promise<Categoria>{
        return await this.categoriaRepository.save(categoria);
    }

    /**
     * @desc Atualiza o Produto no banco de dados
     * @param produto.id Identificador para atualizar o produto
     * @returns O conteudo atualizado
     * @throws HttpExeption Caso o produto informado não seja encontrado
     */
    async update(categoria: Categoria): Promise<Categoria>{
        let buscaCategoria: Categoria = await this.findById(categoria.id)

        if(!buscaCategoria || !categoria.id)
            throw new HttpException('Categoria não encontrada!', HttpStatus.NOT_FOUND);
        return await this.categoriaRepository.save(categoria);
    }

    /**
     * @desc Apaga um Produto do banco de dados
     * @param id O identificador do Produto a ser apagado
     * @returns Conteúdo vazio
     * @throws HttpException Caso o id informado não seja encontrado
     * @example
     * delete(1); // Será apagado o produto com id = 1
     * delete(4); // Será apagado o produto com id = 4
     */
    async delete(id: number): Promise<DeleteResult>{
        let buscaCategoria = await this.findById(id);

        if(!buscaCategoria)
            throw new HttpException('Categoria não encontrada', HttpStatus.NOT_FOUND);
        return await this.categoriaRepository.delete(id);
    }
}