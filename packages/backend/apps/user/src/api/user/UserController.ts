import { Controller, UseGuards, UseFilters } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { JwtGuard } from '@lib/jwt/JwtGuard';
import { IJwtMeta } from '@lib/jwt/JwtInterface';
import { RpcExceptionFilter } from '@lib/exceptions';
import { Identity } from '@lib/utils/identity';

import { api as userTypes } from '@grpc-proto/user/user.types';
import { api as userEnum } from '@grpc-proto/user/user.enum';
import { api as userApi } from '@grpc-proto/user/user';

import { UserService } from '@user/services/UserService';

import { CreateUserReqDTO } from './dto/CreateUserReqDTO';
import { VerifyUserReqDTO } from './dto/VerifyUserReqDTO';
import { UserReqDTO } from './dto/UserReqDTO';
import { UpdateUserReqDTO } from './dto/UpdateUserReqDTO';

@Controller()
export class UserController {

    constructor(private readonly userService: UserService) {
    }

    @GrpcMethod('UserService', 'CreateUser')
    @UseFilters(RpcExceptionFilter.for('UserController::createUser'))
    public createUser(data: CreateUserReqDTO): Observable<userApi.user.UserRes> {
        return this.userService.createUser(data).pipe(
            map(() => {
                return {
                    status: userEnum.user.EStatus.SUCCESS,
                    message: `User created successfully`,
                };
            }),
        );
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('UserService', 'UpdateUser')
    @UseFilters(RpcExceptionFilter.for('UserController::updateUser'))
    public updateUser(data: UpdateUserReqDTO, meta: IJwtMeta<{ id: string; }>): Observable<userApi.user.UserRes> {
        return this.userService.updateUser(data, meta.payload.id).pipe(
            map(() => {
                return {
                    status: userEnum.user.EStatus.SUCCESS,
                    message: `User update successfully: ID: ${meta.payload.id}`,
                };
            }),
        );
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('UserService', 'DeleteUser')
    @UseFilters(RpcExceptionFilter.for('UserController::deleteUser'))
    public deleteUser(data: UserReqDTO): Observable<userApi.user.UserRes> {
        return this.userService.deleteUser(data.id).pipe(
            map(() => {
                return {
                    status: userEnum.user.EStatus.SUCCESS,
                    message: `User delete successfully: ID: ${data.id}`,
                };
            }),
        );
    }

    @GrpcMethod('UserService', 'VerifyUser')
    @UseFilters(RpcExceptionFilter.for('UserController::verifyUser'))
    public verifyUser(data: VerifyUserReqDTO): Observable<userTypes.user.User> {
        return this.userService.verifyUser(data);
    }

    @GrpcMethod('UserService', 'GetUser')
    @UseFilters(RpcExceptionFilter.for('UserController::getUser'))
    public getUser(data: UserReqDTO): Observable<userTypes.user.User> {
        return this.userService.getUser(data.id);
    }

    @GrpcMethod('UserService', 'GetUsersAll')
    @UseFilters(RpcExceptionFilter.for('UserController::getUsersAll'))
    public getUsersAll(data: Identity<userTypes.user.Stub>): Observable<userApi.user.UsersRes> {
        return this.userService.getUsersAll();
    }
}
