import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Postagem } from '../entities/postagem.entity';

// injectable é usado em serviços(logica de como vai funcionar as coisas)
@Injectable()
export class PostagemService {
    constructor(
        // o insegctrepository tem relação com o banco de dados, arquivo entity | todas as interações 
        @InjectRepository(Postagem)
        // recurso do typeorm que lida com postagem
        private postagemRepository: Repository<Postagem>
    ) {}

    async findAll(): Promise<Postagem[]> {
        // select * from postagens (find() do typeorm), já tem varios metodos prontos
        return this.postagemRepository.find({ 
            relations:{
            tema: true,
            usuario: true
        }});
       
    }

    async findById(id: number): Promise<Postagem> {
        const postagem = await this.postagemRepository.findOne({
            where: {
                id,
            },
            relations:{
                tema: true,
                usuario: true
            }
        });

        if (!postagem) {
            throw new HttpException('Postagem não encontrada', HttpStatus.NOT_FOUND,
            );
        }
        return postagem;
    }

    async findByTitulo(titulo: string): Promise<Postagem[]> {
        return this.postagemRepository.find({
            where: {
                titulo: ILike(`%${titulo}%`)
            },
            relations:{
                tema: true,
                usuario: true
            }
        })}

    async create(postagem: Postagem): Promise<Postagem> {
        return await this.postagemRepository.save(postagem);
    }

    async update (postagem: Postagem): Promise<Postagem> {
        await this.findById(postagem.id)
        return this.postagemRepository.save(postagem)
    }
    
    async delete (id: number): Promise<DeleteResult>{
        await this.findById(id)
        //deleAll é o dele sem o where
        return this.postagemRepository.delete(id)
    }
}