import { Catch, Logger, RpcExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { QueryFailedError } from 'typeorm';
import { throwError } from 'rxjs';
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
            this.handleRpcException(exception);
        } else if (exception instanceof QueryFailedError) {
            this.handleTypeOrmException(exception);
        } else {
            this.handleRawError(exception);
        }

        return throwError({
            code: status.INTERNAL,
            message: 'Internal Server Error',
        });
    }

    private handleRpcException(exception: RpcException): void {
        const { stack } = exception;

        this.warn(`Error: ${JSON.stringify(exception.getError())} \nStack: ${stack.toString()}`);
    }

    private handleTypeOrmException(exception: ITypeormError): void {
        const { message, name, query, parameters, code, stack } = exception;

        this.warn(`${message || name}, \nCode: ${code} \nTypeOrm query: ${query},\nParams: ${parameters} \nStack: ${stack}`);
    }

    private handleRawError(exception: Error): void {
        const { stack, message } = exception;

        this.warn(`${stack || message || exception.toString()} \nStack: ${stack}`);
    }

    private warn(message: string): void {
        this.logger.error(`\n${this.location}: \n\t${message}`);
    }
}
