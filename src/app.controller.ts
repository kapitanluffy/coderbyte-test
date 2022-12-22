import { Controller, Get, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { Public } from './auth/jwt-auth.guard';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    ) {}

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
