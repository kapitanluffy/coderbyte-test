import { Request as HttpRequest } from 'express';
import { HttpException, HttpStatus } from '@nestjs/common';

export type MockType<T> = {
  [F in keyof T]?: jest.Mock<{}>;
};

export type AuthedRequest = HttpRequest & { user: any }


const tooManyRequestsMessage = 'Too Many Requests';

export class TooManyRequestsException extends HttpException {
  constructor(message?: string) {
    super(`${message || tooManyRequestsMessage}`, HttpStatus.TOO_MANY_REQUESTS);
  }
}
