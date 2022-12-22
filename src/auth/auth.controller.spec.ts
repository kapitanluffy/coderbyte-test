import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { MockType } from 'src/utils/utils';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

const MockFactory: <T>() => MockType<T> = jest.fn(() => ({

}));

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AuthService,
          useFactory: () => MockFactory<AuthService>()
        },
        {
          provide: UsersService,
          useFactory: () => MockFactory<UsersService>()
        }
      ],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
