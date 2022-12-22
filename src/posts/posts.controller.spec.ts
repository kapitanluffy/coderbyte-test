import { Test, TestingModule } from '@nestjs/testing';
import { CreditsInterceptor } from '../users/credits.interceptor';
import { MockType } from 'src/utils/utils';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { UsersService } from '../users/users.service';

const MockFactory: <T>() => MockType<T> = jest.fn(() => ({

}));

describe('PostsController', () => {
  let controller: PostsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PostsService,
          useFactory: () => MockFactory<PostsService>()
        },
        {
          provide: CreditsInterceptor,
          useFactory: () => MockFactory<CreditsInterceptor>()
        },
        {
          provide: UsersService,
          useFactory: () => MockFactory<UsersService>()
        }
      ],
      controllers: [PostsController],
    }).compile();

    controller = module.get<PostsController>(PostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
