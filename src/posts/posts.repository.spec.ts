import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockType } from 'src/utils/utils';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { PostsMicroRepository } from './posts.repository';
import fetch from 'node-fetch';

jest.mock('node-fetch')
const { Response } = jest.requireActual('node-fetch');


describe('PostsMicroRepository', () => {
  let service: PostsMicroRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsMicroRepository
      ],
    }).compile();

    service = module.get<PostsMicroRepository>(PostsMicroRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create a Post', async  () => {
    (fetch as jest.MockedFunction<typeof fetch>).mockImplementation((url, init) => {
      return Promise.resolve(new Response(init.body))
    })

    const post = await service.create({
      title: 'Foo',
      body: 'This is a test',
      userId: 1
    })

    expect(post.title).toBe('Foo')
  })

  it('find a Post', async  () => {
    (fetch as jest.MockedFunction<typeof fetch>).mockImplementation((url, init) => {
      const records = [{
        id: "id1"
      }]
      return Promise.resolve(new Response(JSON.stringify({ records })))
    })

    const post = await service.get("id1")

    expect(post.id).toBe('id1')
  })

  it('find all Posts', async  () => {
    (fetch as jest.MockedFunction<typeof fetch>).mockImplementation((url, init) => {
      const records = [{
        id: "id1"
      }]
      return Promise.resolve(new Response(JSON.stringify({ records })))
    })

    const posts = await service.getAll()

    expect(Array.isArray(posts)).toBe(true)
  })

  it('update a Post', async  () => {
    (fetch as jest.MockedFunction<typeof fetch>).mockImplementation((url, init) => {
      return Promise.resolve(new Response(JSON.stringify({})))
    })

    const isUpdated = await service.update("id1", { title: "Updated title" })

    expect(isUpdated).toBe(true)
  })

  it('delete a Post', async  () => {
    (fetch as jest.MockedFunction<typeof fetch>).mockImplementation((url, init) => {
      return Promise.resolve(new Response(JSON.stringify({})))
    })

    const isUpdated = await service.delete("id1")

    expect(isUpdated).toBe(true)
  })
});
