import { BaseException } from '../../impl/BaseException';
import { ExceptionType } from '../types';

export interface IExceptionHandler {
    wrapError(): BaseException;

    warnAboutError(): void;
}

export interface IExceptionHandlerFactory {
    getHandler(exception: ExceptionType): IExceptionHandler;
}
