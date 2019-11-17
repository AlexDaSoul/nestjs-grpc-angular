import { Controller, UseFilters, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, GrpcMethod } from '@nestjs/microservices';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { Metadata } from 'grpc';

import { RpcExceptionFilter } from '../../lib/exceptions';

import { User } from '../../grpc-proto/user/user.types_pb';
import { UserReq, VerifyUserReq } from '../../grpc-proto/user/user_pb';
import { Stub } from '../../grpc-proto/auth/auth.types_pb';
import { AuthRes, VerifyAuthTokenReq, VerifyAuthTokenRes } from '../../grpc-proto/auth/auth_pb';

import { grpcUser } from '../../env';

import { PemCertsService } from '../../services/PemCertsService';
import { JwtCertsService } from '../../services/JwtCertsService';

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
        ) {
    }

    @GrpcMethod('AuthService', 'Auth')
    @UseFilters(RpcExceptionFilter.for('AuthController::auth'))
    public auth(data: AuthReqDTO): Observable<AuthRes.AsObject> {
        return from(this.grpcUserService.verifyUser(data)).pipe(
            map(user => {
                return this.jwtService.addToken({
                    id: user.id,
                    email: user.email,
                });
            }),
            map(token => ({ token })),
        );
    }

    @GrpcMethod('AuthService', 'UpdateAuth')
    @UseFilters(RpcExceptionFilter.for('AuthController::updateAuth'))
    public updateAuth(data: Stub.AsObject, meta: Metadata): AuthRes.AsObject {
        const token = meta.get('authorization')[0].toString();
        const payload = this.jwtService.verifyToken(token);

        return {
            token: this.jwtService.addToken({
                id: payload.id,
                email: payload.email,
            }),
        };
    }

    @GrpcMethod('AuthService', 'VerifyAuthToken')
    @UseFilters(RpcExceptionFilter.for('AuthController::verifyAuthToken'))
    public verifyAuthToken(data: VerifyAuthTokenReq.AsObject): VerifyAuthTokenRes.AsObject {
        return this.jwtService.verifyToken(data.token);
    }
}
