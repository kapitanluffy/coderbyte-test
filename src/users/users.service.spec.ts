import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { addDays } from 'date-fns';
import { MockType } from 'src/utils/utils';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';

const MockRepoFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  findOneBy: jest.fn(({ username, id }) => {
    const u = new User()
    u.id = id || 1
    u.username = username || "John"
    u.refreshDate = addDays((new Date()).getTime(), 30).getTime()
    u.extraCredits = 0
    u.credits = 20

    if (u.id === 2) {
      u.extraCredits = 5
    }

    return u
  }),

  create: jest.fn((entity) => {
    return { ...entity } as User
  }),

  save: jest.fn((entity: User) => {
    return { id: 1, ...entity } as User
  }),
}));

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useFactory: () => MockRepoFactory()
        }
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('find a user', async () => {
    const user = await service.findOne('John')

    expect(user.username).toBe('John')
  });

  it('create a user', async () => {
    const user = await service.create({
      username: 'John',
      password: 'hunter2'
    })

    expect(user.id).toBe(1)
  });

  it('get a user', async () => {
    const user = await service.get(1)

    expect(user.id).toBe(1)
  });

  it('should check if credits should be refreshed', async () => {
    const u = await service.get(1)
    const shouldRefresh = await service.shouldRefreshCredits(u)

    expect(shouldRefresh).toBe(false)
  });

  it('should increment user credits', async () => {
    const u = await service.get(1)
    const user = await service.addExtraCredits(u, { credits: 5 })

    expect(user.extraCredits).toBe(5)
  });

  it('should decrement api call count', async () => {
    const u = await service.get(1)
    const user = await service.minusCredits(u)

    expect(user.credits).toBe(19)
  });

  it('should decrement user credits', async () => {
    const u = await service.get(2)
    const user = await service.minusCredits(u)

    expect(user.credits).toBe(20)
    expect(user.extraCredits).toBe(4)
  });

  it('should reset api call count', async () => {
    const u = await service.get(1)
    const user = await service.minusCredits(u)
    const reset = await service.resetCredits({ ...user })

    expect(user.credits).toBe(19)
    expect(reset.credits).toBe(20)
  });
});
