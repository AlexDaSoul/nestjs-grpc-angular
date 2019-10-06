import { Observable } from 'rxjs';
import { Metadata } from 'grpc';

export interface IJwtMeta<T> extends Metadata {
    payload: T;
}

export interface IAuthService {
    verifyAuthToken(token: string): Observable<{ verify: boolean; }>;
}
