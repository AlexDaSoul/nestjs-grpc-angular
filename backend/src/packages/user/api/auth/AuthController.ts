import { Controller, UseGuards, UseFilters } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';

import { JwtGuard } from '../../lib/jwt/jwt.guard';
import { IJwtMeta } from '../../lib/jwt/jwt.interface';
import { RpcExceptionFilter } from '../../lib/exceptions';

import { UserStub } from '../../grpc-proto/user/user.types_pb';
import { AuthRes } from '../../grpc-proto/user/auth_pb';

import { UserService } from '../../services/UserService';
import { JwtCertsService } from '../../services/JwtCertsService';

import { UserAuthDTO } from './dto/UserAuthDTO';

@Controller()
export class AuthController {

    constructor(
        private readonly userService: UserService,
        private readonly jwtCertsService: JwtCertsService,
        ) {
    }

    @GrpcMethod('AuthService', 'Auth')
    @UseFilters(RpcExceptionFilter.for('AuthController::auth'))
    public auth(data: UserAuthDTO): Observable<AuthRes.AsObject> {
        return from(this.userService.verifyUser(data)).pipe(
            map(user => this.jwtCertsService.addTokenWithPayload(user)),
        );
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('AuthService', 'UpdateAuth')
    @UseFilters(RpcExceptionFilter.for('AuthController::updateAuth'))
    public updateAuth(data: UserStub.AsObject, meta: IJwtMeta<{ id: string; }>): Observable<AuthRes.AsObject> {
        return from(this.userService.getUser(meta.payload.id)).pipe(
            map(user => this.jwtCertsService.addTokenWithPayload(user)),
        );
    }
}
