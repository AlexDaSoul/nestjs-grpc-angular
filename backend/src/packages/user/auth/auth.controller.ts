import { Controller, UseGuards, Logger } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { status } from 'grpc';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { JwtGuard } from '../lib/jwt/jwt.guard';
import { IUserMeta } from '../lib/jwt/jwt.interface';
import { api } from '../grpc-proto/user';
import env from '../env';

import { AuthService } from '../common/services/auth.service';
import { JwtCertsService } from '../common/services/jwt-certs.service';

type Identity<T> = T;

@Controller('auth')
export class AuthController {
    private readonly logger = new Logger('AuthController');

    constructor(private readonly jwtCertsService: JwtCertsService, private readonly authService: AuthService) {}

    @GrpcMethod('AuthService', 'Auth')
    public auth(data: Identity<api.user.IAuthReq>): Observable<api.user.IAuthRes> {
        const { email, password } = data;

        return this.authService.addJwtToken({ email }, password).pipe(
            catchError(err => {
                const msg = `Auth: ${err}`;
                this.logger.error(msg);
                throw new RpcException({ code: status.INTERNAL, message: msg });
            }),
        );
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('AuthService', 'UpdateAuth')
    public updateAuth(
        data: Identity<api.user.IUpdateAuthReq>,
        meta: IUserMeta,
    ): Identity<api.user.IUpdateAuthRes> {
        try {
            return {
                token: this.jwtCertsService.addToken({ id: meta.user.id }, +env.JWT_EXPIRE),
            };
        } catch (err) {
            const msg = `UpdateAuth: ${err}`;
            this.logger.error(msg);
            throw new RpcException({ code: status.INTERNAL, message: msg });
        }
    }

}
