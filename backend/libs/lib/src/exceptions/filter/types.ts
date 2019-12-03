import { RpcException } from '@nestjs/microservices';
import { BaseException } from '../impl/BaseException';

export type ExceptionType = Error | RpcException | BaseException;

export const EXCEPTION_LIST = [Error, RpcException, BaseException];
