import { HttpStatus, Injectable } from "@nestjs/common";
import { HttpException } from "@nestjs/common/exceptions/http.exception";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Categoria } from "../entities/categoria.entity";


@Injectable()
export class categoriaService{
    constructor(
        @InjectRepository(Categoria)
        private categoriaRepository: Repository<Categoria>
    ) {}

 //Get - Encontrar todos
    async findAll(): Promise<Categoria[]>{
        return await this.categoriaRepository.find();
    }

 //Get - Encontrar por ID
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

 //Get - Encontrar por nome

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

 //Post - Criar categoria

    async create(categoria: Categoria): Promise<Categoria>{
        return await this.categoriaRepository.save(categoria);
    }

 //Put - Atualizar categoria

    async update(categoria: Categoria): Promise<Categoria>{
        let buscaCategoria: Categoria = await this.findById(categoria.id)

        if(!buscaCategoria || !categoria.id)
            throw new HttpException('Categoria não encontrada!', HttpStatus.NOT_FOUND);
        return await this.categoriaRepository.save(categoria);
    }
 //Delete - Deletar categoria

    async delete(id: number): Promise<DeleteResult>{
        let buscaCategoria = await this.findById(id);

        if(!buscaCategoria)
            throw new HttpException('Categoria não encontrada', HttpStatus.NOT_FOUND);
        return await this.categoriaRepository.delete(id);
    }
}