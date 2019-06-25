import { Controller, UseGuards, UseFilters } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

import { JwtGuard } from '../lib/jwt/jwt.guard';
import { IUserMeta } from '../lib/jwt/jwt.interface';
import { api } from '../grpc-proto/todo/todo';

import { TaskService } from '../common/services/task.service';
import { GrpcExceptionFilter } from '../lib/exceptions/exception.filter';

type Identity<T> = T;

@Controller()
export class TaskController {

    constructor(private readonly taskService: TaskService) {
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('TodoService', 'AddTask')
    @UseFilters(new GrpcExceptionFilter('TodoService::addTask'))
    public addTask(data: Identity<api.todo.TaskReq>, meta: IUserMeta): Observable<api.todo.TaskStatusRes> {
        return this.taskService.addTask(data, meta.user.id);
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('TodoService', 'UpdateTask')
    @UseFilters(new GrpcExceptionFilter('TodoService::updateTask'))
    public updateTask(data: Identity<api.todo.TaskReq>, meta: IUserMeta): Observable<api.todo.TaskStatusRes> {
        return this.taskService.updateTask(data, meta.user.id);
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('TodoService', 'DeleteTask')
    @UseFilters(new GrpcExceptionFilter('TodoService::deleteTask'))
    public deleteTask(data: Identity<api.todo.DeleteTaskReq>, meta: IUserMeta): Observable<api.todo.TaskStatusRes> {
        return this.taskService.deleteTask(data, meta.user.id);
    }

    @GrpcMethod('TodoService', 'GetTasksStream')
    @UseFilters(new GrpcExceptionFilter('TodoService::getTasksStream'))
    public getTasksStream(data: Identity<api.todo.TodoStub>, meta: IUserMeta): Observable<api.todo.TaskListRes> {
        return this.taskService.getTasksStream(data, meta.user.id);
    }

}
