import { RpcExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { QueryFailedError } from 'typeorm';
import { Observable } from 'rxjs';
interface ITypeormError extends QueryFailedError {
    code: string;
    query: string;
    parameters: any[] | undefined;
    driverError: any;
}
declare type ExceptionType = Error | ITypeormError | RpcException;
export declare class GrpcExceptionFilter implements RpcExceptionFilter<RpcException> {
    private readonly location;
    private logger;
    constructor(location: string);
    catch(exception: ExceptionType): Observable<RpcException>;
    private handleRpcException;
    private handleTypeOrmException;
    private handleRawError;
    private warn;
}
export {};
