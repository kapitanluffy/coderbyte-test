import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsMicroRepository } from './posts.repository';

@Injectable()
export class PostsService {
    constructor(
        private postsRepository: PostsMicroRepository
    ) {}

    async create(data: CreatePostDto) {
        return await this.postsRepository.create(data)
    }

    async get(id: string) {
        return await this.postsRepository.get(id)
    }

    async getAll() {
        return await this.postsRepository.getAll()
    }

    async update(id: string, data: UpdatePostDto) {
        return await this.postsRepository.update(id, data)
    }

    async delete(id: string) {
        return await this.postsRepository.delete(id)
    }
}
