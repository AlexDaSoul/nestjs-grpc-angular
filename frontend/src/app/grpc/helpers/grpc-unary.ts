import { Observable, from, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Error, StatusCode } from 'grpc-web';
import * as jspb from 'google-protobuf';

export function grpcUnary<T>(promise): Observable<T> {
    return from(promise).pipe(
        map((response: jspb.Message) => {
            return response.toObject();
        }),
        catchError((error: Error) => {
            if (error.code === StatusCode.UNAUTHENTICATED) {
               // document.dispatchEvent(new Event('InvalidJWT'));
            }

            return throwError(error);
        })
    );
}
