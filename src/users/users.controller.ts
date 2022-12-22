import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request } from '@nestjs/common';
import { AuthedRequest } from 'src/utils/utils';
import { AddCreditsDto } from './dto/add-credits.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @HttpCode(HttpStatus.NO_CONTENT)
    @Post('/me/credits')
    async addUserCredits(
        @Request() req: AuthedRequest,
        @Body() data: AddCreditsDto
    ) {
        const user = await this.usersService.get(req.user.id)
        await this.usersService.addExtraCredits(user, data)
    }

    @Get('/me')
    async getUser(
        @Request() req: AuthedRequest
    ) {
        const user = await this.usersService.findOne(req.user.username)
        const { password, ...data } = user

        return data
    }
}
