import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MockType, TooManyRequestsException } from '../utils/utils';
import { CreditsInterceptor } from './credits.interceptor';
import { User } from './user.entity';
import { UsersService } from './users.service';

const _mocks: MockType<UsersService> = {
  get: jest.fn((id) => {
    const u = { id, credits: 20 } as User

    if (id === 3) {
      u.credits = 0
    }

    return u
  }),

  shouldRefreshCredits: jest.fn((u) => {
    if (u.id === 2) return true

    return false
  }),

  resetCredits: jest.fn((u) => {
    return { id: u.id, credits: 20 } as User
  }),

  minusCredits: jest.fn()
}

const MockFactory: <T>() => MockType<T> = jest.fn(() => _mocks);

describe('CreditsInterceptor', () => {
  let service: CreditsInterceptor;

  beforeEach(async () => {
    jest.clearAllMocks()

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreditsInterceptor,
        {
          provide: UsersService,
          useFactory: () => MockFactory<UsersService>()
        }
      ],
    }).compile();

    service = module.get<CreditsInterceptor>(CreditsInterceptor);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should allow request', async () => {
    service.checkCredits(1)

    expect(await _mocks.get).toHaveBeenCalledTimes(1)
    expect(await _mocks.shouldRefreshCredits).toHaveBeenCalledTimes(1)
    expect(await _mocks.minusCredits).toHaveBeenCalledTimes(1)
  });

  it('should reset', async () => {
    service.checkCredits(2)

    expect(await _mocks.get).toHaveBeenCalledTimes(1)
    expect(await _mocks.shouldRefreshCredits).toHaveBeenCalledTimes(1)
    expect(await _mocks.resetCredits).toHaveBeenCalledTimes(1)
    expect(await _mocks.minusCredits).toHaveBeenCalledTimes(1)
  });

  it('should throw too many requests', async () => {
    expect(service.checkCredits(3)).rejects.toThrowError(TooManyRequestsException);

    expect(await _mocks.get).toHaveBeenCalledTimes(1)
    expect(await _mocks.shouldRefreshCredits).toHaveBeenCalledTimes(1)
  });
});
