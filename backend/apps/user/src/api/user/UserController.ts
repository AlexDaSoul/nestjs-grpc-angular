import { Controller, UseGuards, UseFilters } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { JwtGuard } from '@lib/jwt/jwt.guard';
import { IJwtMeta } from '@lib/jwt/jwt.interface';
import { RpcExceptionFilter } from '@lib/exceptions';

import { User, EStatus, Stub } from '@grpc-proto/user/user.types_pb';
import { UserRes } from '@grpc-proto/user/user_pb';

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
    public createUser(data: CreateUserReqDTO): Observable<UserRes.AsObject> {
        return this.userService.createUser(data).pipe(
            map(res => {
                return {
                    status: EStatus.SUCCESS,
                    message: `User created successfully: ID: ${res.id}`,
                };
            }),
        );
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('UserService', 'UpdateUser')
    @UseFilters(RpcExceptionFilter.for('UserController::updateUser'))
    public updateUser(data: UpdateUserReqDTO, meta: IJwtMeta<{ id: string; }>): Observable<UserRes.AsObject> {
        return this.userService.updateUser(data, meta.payload.id).pipe(
            map(() => {
                return {
                    status: EStatus.SUCCESS,
                    message: `User update successfully: ID: ${meta.payload.id}`,
                };
            }),
        );
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('UserService', 'DeleteUser')
    @UseFilters(RpcExceptionFilter.for('UserController::deleteUser'))
    public deleteUser(data: UserReqDTO): Observable<UserRes.AsObject> {
        return this.userService.deleteUser(data.id).pipe(
            map(() => {
                return {
                    status: EStatus.SUCCESS,
                    message: `User delete successfully: ID: ${data.id}`,
                };
            }),
        );
    }

    @GrpcMethod('UserService', 'VerifyUser')
    @UseFilters(RpcExceptionFilter.for('UserController::verifyUser'))
    public verifyUser(data: VerifyUserReqDTO): Observable<User.AsObject> {
        return this.userService.verifyUser(data);
    }

    @GrpcMethod('UserService', 'GetUser')
    @UseFilters(RpcExceptionFilter.for('UserController::getUser'))
    public getUser(data: UserReqDTO): Observable<User.AsObject> {
        return this.userService.getUser(data.id);
    }

    @GrpcMethod('UserService', 'GetUsersAll')
    @UseFilters(RpcExceptionFilter.for('UserController::getUsersAll'))
    public getUsersAll(data: Stub.AsObject): Observable<{ users: User.AsObject[] }> {
        return this.userService.getUsersAll();
    }
}
