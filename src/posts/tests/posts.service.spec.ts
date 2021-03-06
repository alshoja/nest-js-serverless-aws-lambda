import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PostsRepository } from '../posts.repository';
import { PostsService } from '../posts.service';

describe('PostsService', () => {
  let service: PostsService;
  let postRepository: PostsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostsService, PostsRepository],
    }).compile();

    service = module.get<PostsService>(PostsService);
    postRepository = module.get<PostsRepository>(PostsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of posts', async () => {
    const result = [
      {
        userId: 1,
        id: 2,
        title: 'qui est esse',
        body: 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla',
      },
    ];
    jest.spyOn(postRepository, 'findAll').mockImplementation(() => result);
    expect(await service.findAll()).toBe(result);
  });

  it('should return only one post', async () => {
    const result = {
      userId: 1,
      id: 2,
      title: 'qui est esse',
      body: 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla',
    };

    const post = await service.findOne(2);
    expect(post.body).toBe(result.body);
    expect(post.id).toBe(result.id);
  });

  it('should return NotFoundException', async () => {
    try {
      await service.findOne(200);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });
});
