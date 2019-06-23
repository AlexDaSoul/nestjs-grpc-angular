import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Metadata } from 'grpc-web';

import { grpcUnary } from '@grpc/helpers/grpc-unary';
import { grpcJwtMetadata } from '@grpc/helpers/grpc-metadata';
import { AuthServicePromiseClient } from '@grpc/proto/user/auth_grpc_web_pb';
import { AuthReq, AuthRes, UpdateAuthReq, UpdateAuthRes } from '@grpc/proto/user/auth_pb';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private client: AuthServicePromiseClient) {
    }

    public auth(data: AuthReq.AsObject): Observable<AuthRes.AsObject> {
        const req = new AuthReq();

        req.setEmail(data.email);
        req.setPassword(data.password);

        return grpcUnary<AuthRes.AsObject>(this.client.auth(req));
    }

    public updateAuth(): Observable<UpdateAuthRes.AsObject> {
        const req = new UpdateAuthReq();
        const meta: Metadata = grpcJwtMetadata();

        return grpcUnary<UpdateAuthRes.AsObject>(this.client.updateAuth(req, meta));
    }
}
