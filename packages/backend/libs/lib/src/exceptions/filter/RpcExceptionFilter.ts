import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseRpcExceptionFilter } from '@nestjs/microservices';
import { Observable } from 'rxjs';

import { ExceptionType, EXCEPTION_LIST } from './types';
import { IExceptionHandlerFactory } from './handlers/interfaces';
import { ExceptionHandlerFactory } from './handlers/ExceptionHandlerFactory';

@Catch(...EXCEPTION_LIST)
export class RpcExceptionFilter extends BaseRpcExceptionFilter {
    private readonly exceptionHandlerFactory: IExceptionHandlerFactory;

    public static for(label: string): RpcExceptionFilter {
        return new RpcExceptionFilter(label);
    }

    protected constructor(protected readonly label: string) {
        super();

        // for the admin panel, you don’t need to monitor errors
        // such as from CouchDb, so we pass separate AdminExceptionHandlerFactory to it,
        // and for web-backend - WebBackExceptionHandlerFactory
        this.exceptionHandlerFactory = new ExceptionHandlerFactory(this.label);
    }

    public catch(exception: ExceptionType, host: ArgumentsHost): Observable<any> {
        const handler = this.exceptionHandlerFactory.getHandler(exception);

        handler.warnAboutError();

        return super.catch(handler.wrapError(), host as any);
    }
}
