import { Observable, Observer, timer } from 'rxjs';
import { finalize, share, retryWhen, tap, delayWhen } from 'rxjs/operators';
import { StatusCode, ClientReadableStream, Status } from 'grpc-web';
import * as jspb from 'google-protobuf';

import { StreamType } from '@grpc/enums/stream-type.grpc.enum';
import { jwtAuthError$ } from '@grpc/helpers/grpc-jwt';

export function grpcStream<T>(client: ClientReadableStream<T>): Observable<T> {
    let stream: ClientReadableStream<T> = null;
    let subscriptionCounter = 0;

    const data: Observable<any> = new Observable((observer: Observer<T>) => {
        if (subscriptionCounter === 0) {
            stream = client;
        }
        subscriptionCounter++;

        stream.on(StreamType.DATA, (response: jspb.Message) => {
            observer.next(response.toObject());
        });

        stream.on(StreamType.STATUS, (status: Status) => {
            if (status.code === StatusCode.UNAUTHENTICATED) {
                jwtAuthError$.next();
            }

            if (status.code !== StatusCode.OK) {
                observer.error(status);
            }
        });
    });

    return data.pipe(
        finalize(() => {
            subscriptionCounter--;

            if (subscriptionCounter === 0) {
                stream.cancel();
            }
        }),
        share(),
        retryWhen(errors =>
            errors.pipe(
                // log error message
                // TODO: add logger
                tap(val => console.warn(`Stream will be reconnected in 30 seconds`)),
                // restart in 30 seconds
                // TODO: fix deprecated
                delayWhen(val => timer(30000)),
            ),
        ),
    );
}
