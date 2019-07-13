import { Controller, UseGuards, UseFilters } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { from, Observable } from 'rxjs';

import { JwtGuard } from '@lib/jwt/jwt.guard';
import { IJwtMeta } from '@lib/jwt/jwt.interface';
import { GrpcExceptionFilter } from '@lib/exceptions/exception.filter';
import { api } from '@grpc/user/auth';

import { UserService } from '../common/services/user.service';
import { JwtCertsService } from './jwt-certs.service';
import { JWT_EXPIRE } from '../env';
import { map } from 'rxjs/internal/operators';

type Identity<T> = T;

@Controller()
export class AuthController {

    constructor(
        private readonly userService: UserService,
        private readonly jwtCertsService: JwtCertsService,
        ) {
    }

    private getResult(user: api.user.User): api.user.AuthRes {
        const token = this.jwtCertsService.addToken({ id: user.id }, +JWT_EXPIRE);

        return { token, user };
    }

    @GrpcMethod('AuthService', 'Auth')
    @UseFilters(new GrpcExceptionFilter('AuthController::auth'))
    public auth(data: Identity<api.user.AuthReq>): Observable<api.user.AuthRes> {
        return from(this.userService.verifyUser(data)).pipe(
            map(user => this.getResult(user)),
        );
    }

    @UseGuards(JwtGuard)
    @UseFilters(new GrpcExceptionFilter('AuthController::updateAuth'))
    @GrpcMethod('AuthService', 'UpdateAuth')
    public updateAuth(data: Identity<api.user.Empty>, meta: IJwtMeta<{ id: string; }>): Observable<api.user.AuthRes> {
        return from(this.userService.getUser(meta.payload.id)).pipe(
            map(user => this.getResult(user)),
        );
    }
}
