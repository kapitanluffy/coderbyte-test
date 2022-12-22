import { Test, TestingModule } from '@nestjs/testing';
import { MockType } from 'src/utils/utils';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const MockFactory: <T>() => MockType<T> = jest.fn(() => ({

}));

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UsersService,
          useFactory: () => MockFactory<UsersService>()
        }
      ],
      controllers: [UsersController],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
