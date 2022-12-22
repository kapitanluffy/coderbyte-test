import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { addDays, isPast } from 'date-fns'
import { AddCreditsDto } from './dto/add-credits.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return await this.usersRepository.findOneBy({ username });
  }

  async create(data: CreateUserDto) {
    const refreshDate = addDays((new Date()).getTime(), 30).getTime()
    const _data = { ...data, refreshDate }

    return await this.usersRepository.save(
      this.usersRepository.create(_data)
    );
  }

  async get(id: number) {
    return await this.usersRepository.findOneBy({ id });
  }

  async shouldRefreshCredits(user: User) {
    // const user = await this.usersRepository.findOneBy({ id })

    return isPast(user.refreshDate)
  }

  async addExtraCredits(user: User, data: AddCreditsDto) {
    // const user = await this.usersRepository.findOneBy({ id })
    user.extraCredits += data.credits;

    return await this.usersRepository.save(user)
  }

  async minusCredits(user: User) {
    // const user = await this.usersRepository.findOneBy({ id })

    if (user.extraCredits > 0) {
      user.extraCredits -= 1
    }
    else if (user.extraCredits <= 0) {
      user.credits -= 1;
    }

    return await this.usersRepository.save(user)
  }

  async resetCredits(user: User) {
    // const user = await this.usersRepository.findOneBy({ id })
    user.credits = 20;

    return await this.usersRepository.save(user)
  }
}
