import { Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { RpcException, BaseRpcExceptionFilter } from '@nestjs/microservices';
import { QueryFailedError } from 'typeorm';
import { Observable } from 'rxjs';

import { InternalException } from './exceptions';

const COUCH_DB_LABEL: string = 'couch';

@Catch()
export class RpcExceptionFilter extends BaseRpcExceptionFilter {
    private readonly logger = new Logger('RpcExceptionFilter');

    constructor(private readonly serviceName: string, private readonly methodName: string) {
        super();
    }

    catch(exception: any, host: ArgumentsHost): Observable<any> {
        if (exception instanceof RpcException) {
            return super.catch(exception, host);
        }

        if (exception instanceof QueryFailedError) {
            return this.handleTypeOrmException(exception, host);
        }

        if (this.isCouchDbException(exception)) {
            return this.handleCouchDbException(exception, host);
        }

        return this.handleRawError(exception, host);
    }

    private isCouchDbException(exception: any): boolean {
        const { scope }: any = exception;
        return scope === COUCH_DB_LABEL;
    }

    private handleTypeOrmException(exception: QueryFailedError, host: ArgumentsHost): Observable<any> {
        const { message, name, query, parameters }: any = exception;
        this.warn(`${message || name}, TypeOrm query: ${query},\nparams: ${parameters}`);

        return super.catch(InternalException.fromError(exception), host);
    }

    private handleCouchDbException(exception: Error, host: ArgumentsHost): Observable<any> {
        const { message, statusCode, request, headers }: any = exception;
        this.warn(`${message}, CouchDb statusCode: ${statusCode},\nrequest: ${request},\nheaders: ${headers}`);

        return super.catch(InternalException.fromError(exception), host);
    }

    private handleRawError(exception: Error, host: ArgumentsHost): Observable<any> {
        const { stack, message } = exception;
        this.warn(`${stack || message || exception.toString()}`);

        return super.catch(InternalException.fromError(exception), host);
    }

    private warn(message: string): void {
        this.logger.warn(`${this.serviceName}.${this.methodName}: ${message}`);
    }
}
