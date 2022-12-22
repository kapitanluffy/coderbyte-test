import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { CreditsInterceptor } from './credits.interceptor';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User
    ])
  ],
  providers: [UsersService, CreditsInterceptor],
  exports: [UsersService, CreditsInterceptor],
  controllers: [UsersController]
})
export class UsersModule {}
