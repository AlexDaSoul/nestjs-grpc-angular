import { Controller, UseGuards, UseFilters } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';

import { JwtGuard } from '../../lib/jwt/jwt.guard';
import { IJwtMeta } from '../../lib/jwt/jwt.interface';
import { RpcExceptionFilter } from '../../lib/exceptions';

import { User, EUserStatus, UserStub } from '../../grpc-proto/user/user.types_pb';
import { UserRes } from '../../grpc-proto/user/user_pb';

import { UserService } from '../../services/UserService';

import { CreateUserReqDTO } from './dto/CreateUserReqDTO';
import { UserReqDTO } from './dto/UserReqDTO';

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
                    status: EUserStatus.USER_ACTION_SUCCESS,
                    message: `User created successfully: ID: ${res.id}`,
                };
            }),
        );
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('UserService', 'UpdateUser')
    @UseFilters(RpcExceptionFilter.for('UserController::updateUser'))
    public updateUser(data: CreateUserReqDTO, meta: IJwtMeta<{ id: string; }>): Observable<UserRes.AsObject> {
        return this.userService.updateUser(data, meta.payload.id).pipe(
            map(() => {
                return {
                    status: EUserStatus.USER_ACTION_SUCCESS,
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
                    status: EUserStatus.USER_ACTION_SUCCESS,
                    message: `User delete successfully: ID: ${data.id}`,
                };
            }),
        );
    }

    @GrpcMethod('UserService', 'GetUser')
    @UseFilters(RpcExceptionFilter.for('UserController::getUser'))
    public getUser(data: UserReqDTO): Observable<User.AsObject> {
        return this.userService.getUser(data.id);
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('UserService', 'GetUsersAll')
    @UseFilters(RpcExceptionFilter.for('UserController::getUsersAll'))
    public getUsersAll(data: UserStub.AsObject): Observable<{ users: User.AsObject[] }> {
        return this.userService.getUsersAll();
    }
}
