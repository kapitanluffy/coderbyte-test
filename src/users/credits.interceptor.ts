import { Injectable, NestInterceptor, ExecutionContext, CallHandler, ServiceUnavailableException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TooManyRequestsException } from '../utils/utils';
import { UsersService } from './users.service';

@Injectable()
export class CreditsInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const [req] = context.getArgs()

    await this.checkCredits(req.user.id)

    return next.handle()
  }

  async checkCredits(id) {
    let user = await this.usersService.get(id)
    const shouldRefresh = await this.usersService.shouldRefreshCredits(user)

    if (shouldRefresh) {
      user = await this.usersService.resetCredits(user)
    }

    if (user.credits <= 0) {
      throw new TooManyRequestsException()
    }

    await this.usersService.minusCredits(user)
  }
}
