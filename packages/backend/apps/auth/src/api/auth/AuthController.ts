import { Controller, UseFilters, OnModuleInit, UseGuards } from '@nestjs/common';
import { Client, ClientGrpc, GrpcMethod } from '@nestjs/microservices';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { Metadata } from 'grpc';

import { RpcExceptionFilter } from '@lib/exceptions';
import { JwtGuard } from '@lib/jwt/JwtGuard';
import { grpcUser } from '@lib/utils/GrpcConfigs';
import { Identity } from '@lib/utils/identity';

import { api as userTypes } from '@grpc-proto/user/user.types';
import { api as userApi } from '@grpc-proto/user/user';
import { api as authTypes } from '@grpc-proto/auth/auth.types';
import { api as authApi } from '@grpc-proto/auth/auth';

import { PemCertsService } from '@auth/services/PemCertsService';
import { JwtCertsService } from '@auth/services/JwtCertsService';
import { CertSubscribeService } from '@auth/services/CertSubscribeService';

import { AuthReqDTO } from './dto/AuthReqDTO';

@Controller()
export class AuthController implements OnModuleInit {

    @Client(grpcUser) private readonly grpcUserClient: ClientGrpc;
    private grpcUserService: userApi.user.UserService;

    public onModuleInit(): void {
        this.grpcUserService = this.grpcUserClient.getService<userApi.user.UserService>('UserService');

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
    public auth(data: AuthReqDTO): Observable<authApi.auth.AuthRes> {
        return from(this.grpcUserService.verifyUser(data)).pipe(
            map(user => this.jwtService.addToken(user)),
            map(token => ({token})),
        );
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('AuthService', 'UpdateAuth')
    @UseFilters(RpcExceptionFilter.for('AuthController::updateAuth'))
    public updateAuth(data: Identity<authTypes.auth.Stub>, meta: Metadata): Identity<authApi.auth.AuthRes> {
        const token = meta.get('authorization')[0].toString();
        const payload = this.jwtService.verifyToken(token) as userTypes.user.User;

        return {
            token: this.jwtService.addToken(payload),
        };
    }

    @GrpcMethod('AuthService', 'GetCertStream')
    @UseFilters(RpcExceptionFilter.for('AuthController::getCertStream'))
    public getCertStream(data: Identity<authTypes.auth.Stub>): Observable<authApi.auth.GetCertStreamRes> {
        return this.certSubscribeService.getCert()
            .pipe(map(key => ({key})));
    }
}
