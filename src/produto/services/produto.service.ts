import { Injectable } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common/enums";
import { HttpException } from "@nestjs/common/exceptions";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Produto } from "../entities/produto.entity";

@Injectable()
export class ProdutoService {
    constructor(
        @InjectRepository(Produto)
        private produtoRepository: Repository<Produto>
    ) {}
    
    async findAll(): Promise<Produto[]>{
        return await this.produtoRepository.find({
           relations:{
            categoria: true
           }
        });
    }

    async finById(id: number): Promise<Produto>{
        let produto = await this.produtoRepository.findOne({
            where:{
                id
            },
            relations: {
                categoria: true
            }
        });

        if(!produto)
            throw new HttpException('Produto não encontrada!', HttpStatus.NOT_FOUND);
        return produto;
    }

    async findByName(nome: string): Promise<Produto[]>{
        return await this.produtoRepository.find({
            where:{
                nome:ILike(`%${nome}%`)
            }
        })
    }

    async create(produto: Produto): Promise<Produto>{
        return await this.produtoRepository.save(produto);
    }

    async update(produto: Produto): Promise<Produto>{
        let buscaProduto: Produto = await this.finById(produto.id);
        
        if(!buscaProduto || !produto.id)
            throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);
        return await this.produtoRepository.save(produto);
        
    }

    async delete (id: number): Promise<DeleteResult>{
        let buscaProduto = await this.finById(id);

        if(!buscaProduto)
            throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND);
        return await this.produtoRepository.delete(id);
    }
}