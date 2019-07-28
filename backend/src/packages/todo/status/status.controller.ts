import { Controller, UseGuards, UseFilters } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';

import { JwtGuard } from '../lib/jwt/jwt.guard';
import { IJwtMeta } from '../lib/jwt/jwt.interface';
import { api } from '../grpc-proto/todo/status';

import { StatusService } from '../common/services/status.service';
import { GrpcExceptionFilter } from '../lib/exceptions/exception.filter';

type Identity<T> = T;
const TODO_ACTION_SUCCESS = 1;

@Controller()
export class StatusController {

    constructor(private readonly statusService: StatusService) {
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('StatusService', 'AddStatus')
    @UseFilters(new GrpcExceptionFilter('StatusService::addStatus'))
    public addStatus(data: Identity<api.todo.AddStatusReq>, meta: IJwtMeta<{ id: string; }>): Observable<api.todo.TaskStatusRes> {
        return this.statusService.addStatus(data, meta.payload.id).pipe(
            map(res => {
                return {
                    status: TODO_ACTION_SUCCESS,
                    message: `Status created successfully: ID: ${res.id}`,
                };
            }),
        );
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('StatusService', 'UpdateStatus')
    @UseFilters(new GrpcExceptionFilter('StatusService::updateStatus'))
    public updateStatus(data: Identity<api.todo.StatusList>): Observable<api.todo.TaskStatusRes> {
        return this.statusService.updateStatus(data).pipe(
            map(() => {
                return {
                    status: TODO_ACTION_SUCCESS,
                    message: `Status update successfully`,
                };
            }),
        );
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('StatusService', 'DeleteStatus')
    @UseFilters(new GrpcExceptionFilter('StatusService::deleteStatus'))
    public deleteStatus(data: Identity<api.todo.StatusReq>): Observable<api.todo.TaskStatusRes> {
        return this.statusService.deleteStatus(data.id).pipe(
            map(() => {
                return {
                    status: TODO_ACTION_SUCCESS,
                    message: `Status delete successfully: ID: ${data.id}`,
                };
            }),
        );
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('StatusService', 'GetStatus')
    @UseFilters(new GrpcExceptionFilter('StatusService::getStatus'))
    public getStatus(data: Identity<api.todo.StatusReq>): Observable<api.todo.TaskStatus> {
        return this.statusService.getStatus(data.id);
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('StatusService', 'GetStatuses')
    @UseFilters(new GrpcExceptionFilter('StatusService::getStatuses'))
    public getStatuses(data: Identity<api.todo.StatusesReq>): Observable<api.todo.StatusList> {
        return this.statusService.getStatuses(data.board).pipe(
            map(statuses => ({ statuses })),
        );
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('StatusService', 'GetStatusesWithTasks')
    @UseFilters(new GrpcExceptionFilter('StatusService::getStatusesWithTasks'))
    public getStatusesWithTasks(data: Identity<api.todo.StatusesReq>): Observable<api.todo.StatusList> {
        return this.statusService.getStatusesWithTasks(data.board).pipe(
            map(statuses => ({ statuses })),
        );
    }
}
