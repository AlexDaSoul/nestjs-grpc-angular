import { Controller, UseGuards, UseFilters } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';

import { JWT_EXPIRE } from '../env';

import { JwtGuard } from '../lib/jwt/jwt.guard';
import { IJwtMeta } from '../lib/jwt/jwt.interface';
import { RpcExceptionFilter } from '../lib/exceptions';

import { User, UserStub } from '../grpc-proto/user/user.types_pb';
import { AuthRes, AuthReq } from '../grpc-proto/user/auth_pb';

import { UserService } from '../common/services/user.service';
import { JwtCertsService } from './jwt-certs.service';

@Controller()
export class AuthController {

    constructor(
        private readonly userService: UserService,
        private readonly jwtCertsService: JwtCertsService,
        ) {
    }

    private getResult(user: User.AsObject): AuthRes.AsObject {
        const token = this.jwtCertsService.addToken({ id: user.id }, +JWT_EXPIRE);

        return { token, user };
    }

    @GrpcMethod('AuthService', 'Auth')
    @UseFilters(RpcExceptionFilter.for('AuthController::auth'))
    public auth(data: AuthReq.AsObject): Observable<AuthRes.AsObject> {
        return from(this.userService.verifyUser(data)).pipe(
            map(user => this.getResult(user)),
        );
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('AuthService', 'UpdateAuth')
    @UseFilters(RpcExceptionFilter.for('AuthController::updateAuth'))
    public updateAuth(data: UserStub.AsObject, meta: IJwtMeta<{ id: string; }>): Observable<AuthRes.AsObject> {
        return from(this.userService.getUser(meta.payload.id)).pipe(
            map(user => this.getResult(user)),
        );
    }
}
