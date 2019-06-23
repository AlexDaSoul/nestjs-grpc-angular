import { Controller, UseFilters } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

import { GrpcExceptionFilter } from '../lib/exceptions/exception.filter';
import { api } from '../grpc-proto/user/user';

import { UserService } from '../common/services/user.service';

type Identity<T> = T;

@Controller()
export class UserController {

    constructor(private readonly userService: UserService) {
    }

    @GrpcMethod('UserService', 'CreateUser')
    @UseFilters(new GrpcExceptionFilter('UserController::createUser'))
    public createUser(data: Identity<api.user.CreateUserReq>): Observable<api.user.UserRes> {
        return this.userService.createUser(data);
    }

    @GrpcMethod('UserService', 'UpdateUser')
    @UseFilters(new GrpcExceptionFilter('UserController::updateUser'))
    public updateUser(data: Identity<api.user.UpdateUserReq>): Observable<api.user.UserRes> {
            return this.userService.updateUser(data);
    }

    @GrpcMethod('UserService', 'DeleteUser')
    @UseFilters(new GrpcExceptionFilter('UserController::deleteUser'))
    public deleteUser(data: Identity<api.user.UserReq>): Observable<api.user.UserRes> {
        return this.userService.deleteUser(data.id);
    }

    @GrpcMethod('UserService', 'GetUser')
    @UseFilters(new GrpcExceptionFilter('UserController::getUser'))
    public getUser(data: Identity<api.user.UserReq>): Observable<api.user.User> {
        return this.userService.getUser(data.id);
    }
}
