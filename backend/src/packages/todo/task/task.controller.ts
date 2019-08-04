import { Controller, UseGuards, UseFilters } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';

import { JwtGuard } from '../lib/jwt/jwt.guard';
import { IJwtMeta } from '../lib/jwt/jwt.interface';
import { api } from '../grpc-proto/todo/task';

import { TaskService } from './task.service';
import { GrpcExceptionFilter } from '../lib/exceptions/exception.filter';

type Identity<T> = T;
const TODO_ACTION_SUCCESS = 1;

@Controller()
export class TaskController {

    constructor(private readonly taskService: TaskService) {
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('TaskService', 'AddTask')
    @UseFilters(new GrpcExceptionFilter('TaskService::addTask'))
    public addTask(data: Identity<api.todo.AddTaskReq>, meta: IJwtMeta<{ id: string; }>): Observable<api.todo.TaskStatusRes> {
        return this.taskService.addTask(data, meta.payload.id).pipe(
            map(res => {
                return {
                    status: TODO_ACTION_SUCCESS,
                    message: `Task created successfully: ID: ${res.id}`,
                };
            }),
        );
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('TaskService', 'UpdateTask')
    @UseFilters(new GrpcExceptionFilter('TaskService::updateTask'))
    public updateTask(data: Identity<api.todo.TaskList>): Observable<api.todo.TaskStatusRes> {
        return this.taskService.updateTask(data).pipe(
            map(() => {
                return {
                    status: TODO_ACTION_SUCCESS,
                    message: `Tasks update successfully`,
                };
            }),
        );
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('TaskService', 'DeleteTask')
    @UseFilters(new GrpcExceptionFilter('TaskService::deleteTask'))
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
    @GrpcMethod('TaskService', 'GetTask')
    @UseFilters(new GrpcExceptionFilter('TaskService::deleteTask'))
    public getTask(data: Identity<api.todo.TaskReq>): Observable<api.todo.Task> {
        return this.taskService.getTask(data.id);
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('TaskService', 'GetTasksByUserId')
    @UseFilters(new GrpcExceptionFilter('TaskService::getTasksByUserId'))
    public getTasksByUserId(data: Identity<api.todo.TodoStub>, meta: IJwtMeta<{ id: string; }>): Observable<api.todo.TaskList> {
        return this.taskService.getTasksByUserId(meta.payload.id).pipe(
            map(tasks => ({ tasks })),
        );
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('TaskService', 'GetTasksStream')
    @UseFilters(new GrpcExceptionFilter('TaskService::getTasksStream'))
    public getTasksStream(data: Identity<api.todo.TodoStub>, meta: IJwtMeta<{ id: string; }>): Observable<api.todo.Task> {
        return this.taskService.getTasksStream(meta.payload.id);
    }

}
