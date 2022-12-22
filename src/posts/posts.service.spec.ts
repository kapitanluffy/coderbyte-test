import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockType } from 'src/utils/utils';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { PostsMicroRepository } from './posts.repository';
import { PostsService } from './posts.service';

const MockRepoFactory: <T>() => MockType<T> = jest.fn(() => ({
  get: jest.fn((id) => {
    return { id } as Post
  }),

  getAll: jest.fn(() => [new Post()]),

  create: jest.fn(data => {
    return { ...data, id: "id1" } as Post
  }),

  update: jest.fn((id, data) => true),

  delete: jest.fn((id) => true),
}));

describe('PostsService', () => {
  let service: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: PostsMicroRepository,
          useFactory: () => MockRepoFactory<PostsMicroRepository>()
        }
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create a Post', async  () => {
    const post = await service.create({
      title: 'Foo',
      body: 'This is a test',
      userId: 1
    })

    expect(post.title).toBe('Foo')
  })

  it('get a Post', async  () => {
    const post = await service.get("id1")

    expect(post.id).toBe("id1")
  })

  it('get all Posts', async  () => {
    const posts = await service.getAll()

    expect(Array.isArray(posts)).toBe(true)
  })

  it('update a Post', async  () => {
    const isUpdated = await service.update("id1", { title: "Bar" })

    expect(isUpdated).toBe(true)
  })

  it('delete a Post', async  () => {
    const isDeleted = await service.delete("id1")

    expect(isDeleted).toBe(true)
  })
});
