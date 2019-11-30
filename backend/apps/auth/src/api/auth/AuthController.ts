import { Controller, UseFilters, OnModuleInit, UseGuards } from '@nestjs/common';
import { Client, ClientGrpc, GrpcMethod } from '@nestjs/microservices';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { Metadata } from 'grpc';

import { RpcExceptionFilter } from '@lib/exceptions';
import { JwtGuard } from '@lib/jwt/jwt.guard';

import { User } from '@grpc-proto/user/user.types_pb';
import { UserReq, VerifyUserReq } from '@grpc-proto/user/user_pb';
import { Stub } from '@grpc-proto/auth/auth.types_pb';
import { AuthRes, GetCertStreamRes } from '@grpc-proto/auth/auth_pb';

import { grpcUser } from '@auth/env';

import { PemCertsService } from '@auth/services/PemCertsService';
import { JwtCertsService } from '@auth/services/JwtCertsService';
import { CertSubscribeService } from '@auth/services/CertSubscribeService';

import { AuthReqDTO } from './dto/AuthReqDTO';

interface IUserService {
    verifyUser(data: VerifyUserReq.AsObject): Observable<User.AsObject>;

    getUser(data: UserReq.AsObject): Observable<User.AsObject>;
}

@Controller()
export class AuthController implements OnModuleInit {

    @Client(grpcUser) private readonly grpcUserClient: ClientGrpc;
    private grpcUserService: IUserService;

    public onModuleInit(): void {
        this.grpcUserService = this.grpcUserClient.getService<IUserService>('UserService');

        this.pemService.createCertificate();
    }

    constructor(
        private readonly pemService: PemCertsService,
        private readonly jwtService: JwtCertsService,
        private readonly certSubscribeService: CertSubscribeService,
    ) {
    }

    @GrpcMethod('AuthService', 'Auth')
    @UseFilters(RpcExceptionFilter.for('AuthController::auth'))
    public auth(data: AuthReqDTO): Observable<AuthRes.AsObject> {
        return from(this.grpcUserService.verifyUser(data)).pipe(
            map(user => this.jwtService.addToken(user)),
            map(token => ({token})),
        );
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('AuthService', 'UpdateAuth')
    @UseFilters(RpcExceptionFilter.for('AuthController::updateAuth'))
    public updateAuth(data: Stub.AsObject, meta: Metadata): AuthRes.AsObject {
        const token = meta.get('authorization')[0].toString();
        const payload = this.jwtService.verifyToken(token) as User.AsObject;

        return {
            token: this.jwtService.addToken(payload),
        };
    }

    @GrpcMethod('AuthService', 'GetCertStream')
    @UseFilters(RpcExceptionFilter.for('AuthController::getCertStream'))
    public getCertStream(data: Stub.AsObject): Observable<GetCertStreamRes.AsObject> {
        return this.certSubscribeService.getCert()
            .pipe(map(key => ({key})));
    }
}
