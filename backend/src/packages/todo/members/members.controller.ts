import { Controller, UseGuards, UseFilters } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';

import { JwtGuard } from '../lib/jwt/jwt.guard';
import { IJwtMeta } from '../lib/jwt/jwt.interface';
import { api } from '../grpc-proto/todo/members';

import { MembersService } from '../common/services/members.service';
import { GrpcExceptionFilter } from '../lib/exceptions/exception.filter';

type Identity<T> = T;
const TODO_ACTION_SUCCESS = 1;

@Controller()
export class MembersController {

    constructor(private readonly membersService: MembersService) {
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('MembersService', 'AddMembers')
    @UseFilters(new GrpcExceptionFilter('MembersService::addMembers'))
    public addMembers(data: Identity<api.todo.AddMembersReq>, meta: IJwtMeta<{ id: string; }>): Observable<api.todo.TaskStatusRes> {
        return this.membersService.addMembers(data, meta.payload.id).pipe(
            map(res => {
                return {
                    status: TODO_ACTION_SUCCESS,
                    message: `Members created successfully: ID: ${res.id}`,
                };
            }),
        );
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('MembersService', 'UpdateMembers')
    @UseFilters(new GrpcExceptionFilter('MembersService::updateMembers'))
    public updateMembers(data: Identity<api.todo.Members>): Observable<api.todo.TaskStatusRes> {
        return this.membersService.updateMembers(data).pipe(
            map(() => {
                return {
                    status: TODO_ACTION_SUCCESS,
                    message: `Members update successfully`,
                };
            }),
        );
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('MembersService', 'DeleteMembers')
    @UseFilters(new GrpcExceptionFilter('MembersService::deleteMembers'))
    public deleteMembers(data: Identity<api.todo.MembersReq>): Observable<api.todo.TaskStatusRes> {
        return this.membersService.deleteMembers(data.id).pipe(
            map(() => {
                return {
                    status: TODO_ACTION_SUCCESS,
                    message: `Members delete successfully: ID: ${data.id}`,
                };
            }),
        );
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('MembersService', 'GetMembers')
    @UseFilters(new GrpcExceptionFilter('MembersService::getMembers'))
    public getMembers(data: Identity<api.todo.MembersReq>): Observable<api.todo.Members> {
        return this.membersService.getMembers(data.id);
    }
}
