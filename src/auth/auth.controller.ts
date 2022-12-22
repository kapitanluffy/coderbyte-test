import { Controller, Post, UseGuards, Request, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { AuthedRequest } from 'src/utils/utils';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService
    ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('token')
  async login(@Request() req: AuthedRequest) {
    return this.authService.login(req.user);
  }

  @Public()
  @Post('signup')
  async signup(@Body() data: CreateUserDto) {
    const user = await this.usersService.findOne(data.username)

    if (user) {
      throw new BadRequestException(`User already exists`)
    }

    const { password, ..._user } = await this.usersService.create(data);

    return _user
  }
}
