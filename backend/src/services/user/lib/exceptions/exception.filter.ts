import { Catch, ArgumentsHost, Logger, RpcExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';

@Catch()
export class GrpcExceptionFilter implements RpcExceptionFilter<RpcException> {

    private logger;

    constructor(private readonly location: string) {
        this.logger = new Logger(`${this.location}`);
    }

    catch(exception: RpcException, host: ArgumentsHost): Observable<RpcException> {
        const error = exception.getError ? exception.getError() : exception;

        this.logger.error(error);

        return throwError(error);
    }
}
