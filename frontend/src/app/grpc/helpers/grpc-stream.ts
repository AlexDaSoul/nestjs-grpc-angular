import { Observable, Observer } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { StatusCode, ClientReadableStream, Status } from 'grpc-web';
import * as jspb from 'google-protobuf';

import { StreamType } from '@grpc/enums/stream-type.grpc.enum';


export function grpcStream<T>(client): Observable<T> {
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
    );
}
