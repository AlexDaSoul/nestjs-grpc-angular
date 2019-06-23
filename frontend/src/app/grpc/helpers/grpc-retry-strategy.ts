/*
import { Observable, timer, throwError } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { environment } from '@environments/environment';

import { ServiceError } from '@grpc/models/common/service-error.interface';

export interface IGrpcRetryStrategy {
    name: string;
    logger?: any;
    attempts?: number;
    duration?: number;
}

export const grpcRetryStrategy = (
    {
        name = '',
        logger = null,
        attempts = environment.reconnectAttempts,
        duration = environment.reconnectTimeout,
    }: IGrpcRetryStrategy) => (attempts$: Observable<any>) => {
        return attempts$.pipe(
            mergeMap((error, i) => {
                const retry = i + 1;

                if (retry > attempts) {
                    const message = `Can't connect to ${name} service`;
                    const serviceError: ServiceError = { code: 500, message: message, metadata: null };

                    if (logger) {
                        logger.error(message);
                    }

                    return throwError(serviceError);
                }

                if (logger) {
                    logger.warn(`Attempt: ${retry}: try reconnect to ${name} service after ${duration / 1000} second (s)`);
                }

                return timer(duration);
            }),
        );
    };
*/
