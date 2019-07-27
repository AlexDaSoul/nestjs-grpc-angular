import { Catch, Logger, RpcExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { QueryFailedError } from 'typeorm';
import { Observable, throwError } from 'rxjs';
import { status } from 'grpc';

interface ITypeormError extends QueryFailedError {
    code: string;
    query: string;
    parameters: any[] | undefined;
    driverError: any;
}

type ExceptionType = Error | ITypeormError | RpcException;

@Catch()
export class GrpcExceptionFilter implements RpcExceptionFilter<RpcException> {

    private logger;

    constructor(private readonly location: string) {
        this.logger = new Logger(`${this.location}`);
    }

    catch(exception: ExceptionType) {
        if (exception instanceof RpcException) {
            return this.handleRpcException(exception);
        } else if (exception instanceof QueryFailedError) {
            return this.handleTypeOrmException(exception);
        } else {
            return this.handleRawError(exception);
        }
    }

    private handleRpcException(exception: RpcException): Observable<RpcException> {
        const { stack } = exception;

        this.warn(`Error: ${JSON.stringify(exception.getError())} \nStack: ${stack.toString()}`);

        return throwError(exception.getError());
    }

    private handleTypeOrmException(exception: ITypeormError): Observable<RpcException> {
        const { message, name, query, parameters, code, stack } = exception;

        this.warn(`${message || name}, \nCode: ${code} \nTypeOrm query: ${query},\nParams: ${parameters} \nStack: ${stack}`);

        return throwError({ code: +code, message });
    }

    private handleRawError(exception: Error): Observable<RpcException> {
        const { stack, message } = exception;

        this.warn(`${stack || message || exception.toString()} \nStack: ${stack}`);

        return throwError({
            code: status.INTERNAL,
            message,
        });
    }

    private warn(message: string): void {
        this.logger.warn(`\n${this.location}: \n\t${message}`);
    }
}
