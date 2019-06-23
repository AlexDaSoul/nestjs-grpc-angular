import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Metadata } from 'grpc-web';

import { grpcUnary } from '@grpc/helpers/grpc-unary';
import { grpcJwtMetadata } from '@grpc/helpers/grpc-metadata';
import { UserServicePromiseClient } from '@grpc/proto/user/user_grpc_web_pb';
import { CreateUserReq, UserRes, UserReq } from '@grpc/proto/user/user_pb';
import { User } from '@grpc/proto/user/user.types_pb';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private client: UserServicePromiseClient) {
    }

    public createUser(data: CreateUserReq.AsObject): Observable<UserRes.AsObject> {
        const req = new CreateUserReq();

        req.setEmail(data.email);
        req.setName(data.name);
        req.setPassword(data.password);

        return grpcUnary<UserRes.AsObject>(this.client.createUser(req));
    }

    public updateUser(data: User.AsObject): Observable<UserRes.AsObject> {
        const req = new User();
        const meta: Metadata = grpcJwtMetadata();

        req.setId(data.id);
        req.setEmail(data.email);
        req.setName(data.name);

        return grpcUnary<UserRes.AsObject>(this.client.updateUser(req, meta));
    }

    public deleteUser(data: UserReq.AsObject): Observable<UserRes.AsObject> {
        const req = new UserReq();
        const meta: Metadata = grpcJwtMetadata();

        req.setId(data.id);

        return grpcUnary<UserRes.AsObject>(this.client.deleteUser(req, meta));
    }

    public getUser(data: UserReq.AsObject): Observable<User.AsObject> {
        const req = new UserReq();
        const meta: Metadata = grpcJwtMetadata();

        req.setId(data.id);

        return grpcUnary<User.AsObject>(this.client.getUser(req, meta));
    }
}
