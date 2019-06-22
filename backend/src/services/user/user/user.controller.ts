import {Controller, UseGuards, Logger} from '@nestjs/common';
import {GrpcMethod, RpcException} from '@nestjs/microservices';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {status} from 'grpc';

import {JwtGuard} from '../lib/jwt/jwt.guard';
import {IUserMeta} from '../lib/jwt/jwt.interface';
import {api} from '../grpc-proto/user';

import {UserService} from '../common/services/user.service';

type Identity<T> = T;

@Controller('user')
export class UserController {
    private readonly logger = new Logger('UserController');

    constructor(private readonly userService: UserService) {
    }

    @GrpcMethod('UserService', 'CreateUser')
    public createUser(data: Identity<api.user.ICreateUserReq>): Observable<api.user.IUserRes> {
        return this.userService.createUser(data).pipe(
            catchError(err => {
                const msg = `CreateUser: ${err}`;
                this.logger.error(msg);
                throw new RpcException({code: status.INTERNAL, message: msg});
            }),
        );
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('UserService', 'UpdateUser')
    public updateUser(data: Identity<api.user.IUser>): Observable<api.user.IUserRes> {
        return this.userService.updateUser(data).pipe(
            catchError(err => {
                const msg = `UpdateUser: ${err}`;
                this.logger.error(msg);
                throw new RpcException({code: status.INTERNAL, message: msg});
            }),
        );
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('UserService', 'DeleteUser')
    public deleteUser(data: Identity<api.user.IUserReq>): Observable<api.user.IUserRes> {
        return this.userService.deleteUser(data).pipe(
            catchError(err => {
                const msg = `DeleteUser: ${err}`;
                this.logger.error(msg);
                throw new RpcException({code: status.INTERNAL, message: msg});
            }),
        );
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('UserService', 'GetUser')
    public getUser(data: Identity<api.user.IUserReq>, meta: IUserMeta): Observable<api.user.IUser> {
        return this.userService.getUser(meta.user).pipe(
            catchError(err => {
                const msg = `GetUser: ${err}`;
                this.logger.error(msg);
                throw new RpcException({code: status.INTERNAL, message: msg});
            }),
        );
    }
}
