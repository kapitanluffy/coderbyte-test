import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { MockType } from 'src/utils/utils';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';

const MockFactoryUserService: <T>() => MockType<T> = jest.fn(() => ({
  findOne: jest.fn((username) => {
    return { username, password: 'hunter2', id: 1 } as User
  })
}));

const MockFactoryJwtService: <T>() => MockType<T> = jest.fn(() => ({
  sign: jest.fn((payload) => 'this-is-an-access-token')
}));

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useFactory: () => MockFactoryUserService<UsersService>()
        },
        {
          provide: JwtService,
          useFactory: () => MockFactoryJwtService<JwtService>()
        }
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should validate a user', async () => {
    const user = await service.validateUser('john', 'hunter2')

    expect(user.id).toBe(1)
  });

  it('should NOT validate a user', async () => {
    const user = await service.validateUser('john', 'hunter3')

    expect(user).toBeNull()
  });

  it('should login user', async () => {
    const token = await service.login({ username: 'john', sub: 1 })

    expect(token).toHaveProperty('access_token')
  });
});
