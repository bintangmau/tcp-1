import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export class HttpErrorException extends RpcException {
    constructor(httpStatus: HttpStatus, message: string | object) {
        super({
        statusCode: httpStatus,
        message: message,
        });
    }
}
