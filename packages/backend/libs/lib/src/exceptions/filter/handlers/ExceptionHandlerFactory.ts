import { RpcException } from '@nestjs/microservices';

import { IExceptionHandler, IExceptionHandlerFactory } from './interfaces';

import { RpcExceptionHandler } from './impl/RpcExceptionHandler';
import { InternalExceptionHandler } from './impl/InternalExceptionHandler';

import { ExceptionType } from '../types';

export class ExceptionHandlerFactory implements IExceptionHandlerFactory {
    constructor(private readonly label: string) {
    }

    public getHandler(exception: ExceptionType): IExceptionHandler {
        // handle regular exceptions from current microservices
        if (exception instanceof RpcException) {
            return new RpcExceptionHandler(exception);
        }

        // handle all other internal exceptions
        return new InternalExceptionHandler(exception, this.label);
    }
}
