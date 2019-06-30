import { Observable, from, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Status, StatusCode } from 'grpc-web';
import * as jspb from 'google-protobuf';

import { jwtAuthError$ } from '@grpc/helpers/grpc-jwt';

export function grpcUnary<T>(promise): Observable<T> {
    return from(promise).pipe(
        map((response: jspb.Message) => {
            return response.toObject();
        }),
        catchError((error: Status) => {
            if (error.code === StatusCode.UNAUTHENTICATED) {
                jwtAuthError$.next();
            }

            return throwError(error);
        })
    );
}
