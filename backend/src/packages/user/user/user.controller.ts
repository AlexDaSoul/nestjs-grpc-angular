import { Controller, UseGuards, UseFilters } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

import { JwtGuard } from '../lib/jwt/jwt.guard';
import { IJwtMeta } from '../lib/jwt/jwt.interface';
import { GrpcExceptionFilter } from '../lib/exceptions/exception.filter';
import { api } from '../grpc-proto/user/user';

import { UserService } from '../common/services/user.service';
import { map } from 'rxjs/internal/operators';

type Identity<T> = T;
const USER_ACTION_SUCCESS = 1;

@Controller()
export class UserController {

    constructor(private readonly userService: UserService) {
    }

    @GrpcMethod('UserService', 'CreateUser')
    @UseFilters(new GrpcExceptionFilter('UserController::createUser'))
    public createUser(data: Identity<api.user.CreateUserReq>): Observable<api.user.UserRes> {
        return this.userService.createUser(data).pipe(
            map(res => {
                return {
                    status: USER_ACTION_SUCCESS,
                    message: `User created successfully: ID: ${res.id}`,
                };
            }),
        );
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('UserService', 'UpdateUser')
    @UseFilters(new GrpcExceptionFilter('UserController::updateUser'))
    public updateUser(data: Identity<api.user.UpdateUserReq>, meta: IJwtMeta<{ id: string; }>): Observable<api.user.UserRes> {
        return this.userService.updateUser(data, meta.payload.id).pipe(
            map(() => {
                return {
                    status: USER_ACTION_SUCCESS,
                    message: `User update successfully: ID: ${meta.payload.id}`,
                };
            }),
        );
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('UserService', 'DeleteUser')
    @UseFilters(new GrpcExceptionFilter('UserController::deleteUser'))
    public deleteUser(data: Identity<api.user.UserReq>): Observable<api.user.UserRes> {
        return this.userService.deleteUser(data.id).pipe(
            map(() => {
                return {
                    status: USER_ACTION_SUCCESS,
                    message: `User delete successfully: ID: ${data.id}`,
                };
            }),
        );
    }

    @GrpcMethod('UserService', 'GetUser')
    @UseFilters(new GrpcExceptionFilter('UserController::getUser'))
    public getUser(data: Identity<api.user.UserReq>): Observable<api.user.User> {
        return this.userService.getUser(data.id);
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('UserService', 'GetUsersAll')
    @UseFilters(new GrpcExceptionFilter('UserController::getUsersAll'))
    public getUsersAll(data: Identity<api.user.UserStub>): Observable<api.user.UsersRes> {
        return this.userService.getUsersAll();
    }
}
