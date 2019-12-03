import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Metadata } from 'grpc-web';

import { grpcUnary } from '@grpc/helpers/grpc-unary';
import { grpcJwtMetadata } from '@grpc/helpers/grpc-metadata';

import { AuthServicePromiseClient } from '@grpc/proto/auth/auth_grpc_web_pb';
import { AuthReq, AuthRes } from '@grpc/proto/auth/auth_pb';
import { Stub } from '@grpc/proto/auth/auth.types_pb';

@Injectable({
    providedIn: 'root',
})
export class AuthGrpcService {

    constructor(private client: AuthServicePromiseClient) {
    }

    public auth(data: AuthReq.AsObject): Observable<AuthRes.AsObject> {
        const req = new AuthReq();

        req.setEmail(data.email);
        req.setPassword(data.password);

        return grpcUnary<AuthRes.AsObject>(this.client.auth(req));
    }

    public updateAuth(): Observable<AuthRes.AsObject> {
        const req = new Stub();
        const meta: Metadata = grpcJwtMetadata();

        return grpcUnary<AuthRes.AsObject>(this.client.updateAuth(req, meta));
    }
}
