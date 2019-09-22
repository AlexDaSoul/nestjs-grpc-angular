import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Metadata } from 'grpc-web';

import { grpcUnary } from '@grpc/helpers/grpc-unary';
import { grpcJwtMetadata } from '@grpc/helpers/grpc-metadata';
import { UserServicePromiseClient } from '@grpc/proto/user/user_grpc_web_pb';
import { CreateUserReq, UserRes, UserReq, UsersRes, UpdateUserReq } from '@grpc/proto/user/user_pb';
import { User, UserStub } from '@grpc/proto/user/user.types_pb';

@Injectable({
    providedIn: 'root',
})
export class UserGrpcService {

    constructor(private client: UserServicePromiseClient) {
    }

    public createUser(data: CreateUserReq.AsObject): Observable<UserRes.AsObject> {
        const req = new CreateUserReq();

        req.setName(data.name);
        req.setEmail(data.email);
        req.setPassword(data.password);

        return grpcUnary<UserRes.AsObject>(this.client.createUser(req));
    }

    public updateUser(data: UpdateUserReq.AsObject): Observable<UserRes.AsObject> {
        const req = new UpdateUserReq();
        const meta: Metadata = grpcJwtMetadata();

        req.setName(data.name);
        req.setEmail(data.email);

        return grpcUnary<UserRes.AsObject>(this.client.updateUser(req, meta));
    }

    public deleteUser(data: UserReq.AsObject): Observable<UserRes.AsObject> {
        const req = new UserReq();

        req.setId(data.id);

        return grpcUnary<UserRes.AsObject>(this.client.deleteUser(req));
    }

    public getUser(data: UserReq.AsObject): Observable<User.AsObject> {
        const req = new UserReq();

        req.setId(data.id);

        return grpcUnary<User.AsObject>(this.client.getUser(req));
    }

    public getUsersById(): Observable<UsersRes.AsObject> {
        const req = new UserStub();
        const meta: Metadata = grpcJwtMetadata();

        return grpcUnary<UsersRes.AsObject>(this.client.getUsersAll(req, meta));
    }
}
