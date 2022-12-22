import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { UsersModule } from 'src/users/users.module';
import { PostsMicroRepository } from './posts.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Post
    ]),
    UsersModule
  ],
  providers: [PostsService, PostsMicroRepository],
  controllers: [PostsController]
})
export class PostsModule {}
