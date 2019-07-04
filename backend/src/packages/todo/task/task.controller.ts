import { Controller, UseGuards, UseFilters } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';

import { JwtGuard } from '../lib/jwt/jwt.guard';
import { IJwtMeta } from '../../user/lib/jwt/jwt.interface';
import { api } from '../grpc-proto/todo/todo';

import { TaskService } from '../common/services/task.service';
import { GrpcExceptionFilter } from '../lib/exceptions/exception.filter';

type Identity<T> = T;
const TODO_ACTION_SUCCESS = 1;

@Controller()
export class TaskController {

    constructor(private readonly taskService: TaskService) {
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('TodoService', 'AddTask')
    @UseFilters(new GrpcExceptionFilter('TodoService::addTask'))
    public addTask(data: Identity<api.todo.AddTaskReq>, meta: IJwtMeta<{ id: string; }>): Observable<api.todo.TaskStatusRes> {
        return this.taskService.addTask(data, meta.payload.id).pipe(
            map(res => {
                return {
                    status: TODO_ACTION_SUCCESS,
                    message: `User created successfully: ID: ${res.id}`,
                };
            }),
        );
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('TodoService', 'UpdateTask')
    @UseFilters(new GrpcExceptionFilter('TodoService::updateTask'))
    public updateTask(data: Identity<api.todo.Task>): Observable<api.todo.TaskStatusRes> {
        return this.taskService.updateTask(data).pipe(
            map(() => {
                return {
                    status: TODO_ACTION_SUCCESS,
                    message: `Task update successfully: ID: ${data.id}`,
                };
            }),
        );
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('TodoService', 'DeleteTask')
    @UseFilters(new GrpcExceptionFilter('TodoService::deleteTask'))
    public deleteTask(data: Identity<api.todo.TaskReq>): Observable<api.todo.TaskStatusRes> {
        return this.taskService.deleteTask(data.id).pipe(
            map(() => {
                return {
                    status: TODO_ACTION_SUCCESS,
                    message: `Task delete successfully: ID: ${data.id}`,
                };
            }),
        );
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('TodoService', 'GetTask')
    @UseFilters(new GrpcExceptionFilter('TodoService::deleteTask'))
    public getTask(data: Identity<api.todo.TaskReq>): Observable<api.todo.Task> {
        return this.taskService.getTask(data.id);
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('TodoService', 'GetTasksByUserId')
    @UseFilters(new GrpcExceptionFilter('TodoService::getTasksByUserId'))
    public getTasksByUserId(data: Identity<api.todo.TodoStub>, meta: IJwtMeta<{ id: string; }>): Observable<api.todo.TaskListRes> {
        return this.taskService.getTasksByUserId(meta.payload.id).pipe(
            map(tasks => ({ tasks })),
        );
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('TodoService', 'GetTasksStream')
    @UseFilters(new GrpcExceptionFilter('TodoService::getTasksStream'))
    public getTasksStream(data: Identity<api.todo.TodoStub>, meta: IJwtMeta<{ id: string; }>): Observable<api.todo.Task> {
        return this.taskService.getTasksStream(meta.payload.id);
    }

}
