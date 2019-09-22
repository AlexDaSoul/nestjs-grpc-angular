import { QueryFailedError } from 'typeorm';
import { RpcException } from '@nestjs/microservices';
import { BaseException } from '../impl/BaseException';

export type ExceptionType = Error | QueryFailedError | RpcException | BaseException;

export const EXCEPTION_LIST = [Error, QueryFailedError, RpcException, BaseException];
