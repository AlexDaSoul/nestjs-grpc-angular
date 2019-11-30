import { RpcException } from '@nestjs/microservices';
import { QueryFailedError } from 'typeorm';

import { IExceptionHandler, IExceptionHandlerFactory } from './interfaces';

import { RpcExceptionHandler } from './impl/RpcExceptionHandler';
import { TypeOrmExceptionHandler } from './impl/TypeOrmExceptionHandler';
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

        // handle TypeOrm exceptions
        if (exception instanceof QueryFailedError) {
            return new TypeOrmExceptionHandler(exception, this.label);
        }

        // handle all other internal exceptions
        return new InternalExceptionHandler(exception, this.label);
    }
}
