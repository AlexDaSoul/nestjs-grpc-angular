import { Controller, UseGuards, UseFilters } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';

import { JwtGuard } from '../../lib/jwt/jwt.guard';
import { IJwtMeta } from '../../lib/jwt/jwt.interface';
import { RpcExceptionFilter } from '../../lib/exceptions';

import { TaskStatusRes, ETodoStatus, TaskStatus, TodoStub } from '../../grpc-proto/todo/todo.types_pb';
import { StatusList } from '../../grpc-proto/todo/status_pb';

import { StatusService } from './StatusService';
import { AddStatusReqDTO } from './dto/AddStatusReqDTO';
import { StatusListDTO } from './dto/StatusListDTO';
import { StatusReqDTO } from './dto/StatusReqDTO';

@Controller()
export class StatusController {

    constructor(private readonly statusService: StatusService) {
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('StatusService', 'AddStatus')
    @UseFilters(RpcExceptionFilter.for('StatusService::addStatus'))
    public addStatus(data: AddStatusReqDTO, meta: IJwtMeta<{ id: string; }>): Observable<TaskStatusRes.AsObject> {
        return this.statusService.addStatus(data, meta.payload.id).pipe(
            map(res => {
                return {
                    status: ETodoStatus.TODO_ACTION_SUCCESS,
                    message: `Status created successfully: ID: ${res.id}`,
                };
            }),
        );
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('StatusService', 'UpdateStatus')
    @UseFilters(RpcExceptionFilter.for('StatusService::updateStatus'))
    public updateStatus(data: StatusListDTO): Observable<TaskStatusRes.AsObject> {
        return this.statusService.updateStatus(data).pipe(
            map(() => {
                return {
                    status: ETodoStatus.TODO_ACTION_SUCCESS,
                    message: `Status update successfully`,
                };
            }),
        );
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('StatusService', 'DeleteStatus')
    @UseFilters(RpcExceptionFilter.for('StatusService::deleteStatus'))
    public deleteStatus(data: StatusReqDTO): Observable<TaskStatusRes.AsObject> {
        return this.statusService.deleteStatus(data.id).pipe(
            map(() => {
                return {
                    status: ETodoStatus.TODO_ACTION_SUCCESS,
                    message: `Status delete successfully: ID: ${data.id}`,
                };
            }),
        );
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('StatusService', 'GetStatus')
    @UseFilters(RpcExceptionFilter.for('StatusService::getStatusOne'))
    public getStatus(data: StatusReqDTO): Observable<TaskStatus.AsObject> {
        return this.statusService.getStatus(data.id);
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('StatusService', 'GetStatuses')
    @UseFilters(RpcExceptionFilter.for('StatusService::getStatuses'))
    public getStatuses(data: TodoStub.AsObject, meta: IJwtMeta<{ id: string; }>): Observable<StatusList.AsObject> {
        return this.statusService.getStatuses(meta.payload.id).pipe(
            map(statusesList => ({ statusesList })),
        );
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('StatusService', 'GetStatusesWithTasks')
    @UseFilters(RpcExceptionFilter.for('StatusService::getStatusesWithTasks'))
    public getStatusesWithTasks(data: TodoStub.AsObject, meta: IJwtMeta<{ id: string; }>): Observable<StatusList.AsObject> {
        return this.statusService.getStatusesWithTasks(meta.payload.id).pipe(
            map(statusesList => ({ statusesList })),
        );
    }
}
