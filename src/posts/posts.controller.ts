import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Patch, Post, Put, Request, UseInterceptors } from '@nestjs/common';
import { CreditsInterceptor } from '../users/credits.interceptor';
import { AuthedRequest } from 'src/utils/utils';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';

@UseInterceptors(CreditsInterceptor)
@Controller('posts')
export class PostsController {
    constructor(
        private postsService: PostsService,
    ) {}

    @Get()
    async getAllPosts() {
        return await this.postsService.getAll()
    }

    @Get('/:id')
    async getPost(@Param('id') postId: string) {
        const post = await this.postsService.get(postId)

        if (!post) {
            throw new NotFoundException(`Post ${postId} not found`)
        }

        return post
    }

    @Post()
    async createPost(
        @Request() req: AuthedRequest,
        @Body() data: CreatePostDto
    ) {
        data.userId = req.user.id

        return await this.postsService.create(data)
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Patch('/:id')
    async updatePost(
        @Request() req: AuthedRequest,
        @Param('id') postId: string,
        @Body() data: UpdatePostDto
    ) {
        const post = await this.postsService.get(postId)

        if (!post || post.userId !== req.user.id) {
            throw new NotFoundException(`Post ${postId} not found`)
        }

        const result = this.postsService.update(postId, data)

        if (!result) {
            throw new NotFoundException(`Cannot update Post ${postId}`)
        }
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete('/:id')
    async deletePost(
        @Request() req: AuthedRequest,
        @Param('id') postId: string
    ) {
        const post = await this.postsService.get(postId)

        if (!post || post.userId !== req.user.id) {
            throw new NotFoundException(`Post ${postId} not found`)
        }

        const result = this.postsService.delete(postId)

        if (!result) {
            throw new NotFoundException(`Cannot delete Post ${postId}`)
        }
    }
}
