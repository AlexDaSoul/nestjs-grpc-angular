import { Controller, UseGuards, UseFilters } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

import { JwtGuard } from '../lib/jwt/jwt.guard';
import { IUserMeta } from '../lib/jwt/jwt.interface';
import { api } from '../grpc-proto/user/auth';

import { AuthService } from '../common/services/auth.service';
import { GrpcExceptionFilter } from '../lib/exceptions/exception.filter';

type Identity<T> = T;

@Controller()
export class AuthController {

    constructor(private readonly authService: AuthService) {
    }

    @GrpcMethod('AuthService', 'Auth')
    @UseFilters(new GrpcExceptionFilter('AuthController::auth'))
    public auth(data: Identity<api.user.AuthReq>): Observable<api.user.AuthRes> {
        return this.authService.addJwtToken(data);
    }

    @UseGuards(JwtGuard)
    @UseFilters(new GrpcExceptionFilter('AuthController::updateAuth'))
    @GrpcMethod('AuthService', 'UpdateAuth')
    public updateAuth(data: Identity<api.user.UpdateAuthReq>, meta: IUserMeta): Identity<api.user.UpdateAuthRes> {
        return this.authService.getJwtToken(meta.user.id);
    }
}
