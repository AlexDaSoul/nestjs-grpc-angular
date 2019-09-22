import { Controller, UseGuards, UseFilters } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';

import { JwtGuard } from '@project/lib/jwt/jwt.guard';
import { IJwtMeta } from '@project/lib/jwt/jwt.interface';

import { TaskStatusRes, ETodoStatus, TodoStub, Task } from '../grpc-proto/todo/todo.types_pb';
import { AddTaskReq, TaskList, TaskReq } from '../grpc-proto/todo/task_pb';

import { TaskService } from './task.service';
import { RpcExceptionFilter } from '../lib/exceptions';

@Controller()
export class TaskController {

    constructor(private readonly taskService: TaskService) {
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('TaskService', 'AddTask')
    @UseFilters(RpcExceptionFilter.for('TaskService::addTask'))
    public addTask(data: AddTaskReq.AsObject, meta: IJwtMeta<{ id: string; }>): Observable<TaskStatusRes.AsObject> {
        return this.taskService.addTask(data, meta.payload.id).pipe(
            map(res => {
                return {
                    status: ETodoStatus.TODO_ACTION_SUCCESS,
                    message: `Task created successfully: ID: ${res.id}`,
                };
            }),
        );
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('TaskService', 'UpdateTask')
    @UseFilters(RpcExceptionFilter.for('TaskService::updateTask'))
    public updateTask(data: TaskList.AsObject): Observable<TaskStatusRes.AsObject> {
        return this.taskService.updateTask(data).pipe(
            map(() => {
                return {
                    status: ETodoStatus.TODO_ACTION_SUCCESS,
                    message: `Tasks update successfully`,
                };
            }),
        );
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('TaskService', 'DeleteTask')
    @UseFilters(RpcExceptionFilter.for('TaskService::deleteTask'))
    public deleteTask(data: TaskReq.AsObject): Observable<TaskStatusRes.AsObject> {
        return this.taskService.deleteTask(data.id).pipe(
            map(() => {
                return {
                    status: ETodoStatus.TODO_ACTION_SUCCESS,
                    message: `Task delete successfully: ID: ${data.id}`,
                };
            }),
        );
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('TaskService', 'GetTask')
    @UseFilters(RpcExceptionFilter.for('TaskService::deleteTask'))
    public getTask(data: TaskReq.AsObject): Observable<Task.AsObject> {
        return this.taskService.getTask(data.id);
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('TaskService', 'GetTasksByUserId')
    @UseFilters(RpcExceptionFilter.for('TaskService::getTasksByUserId'))
    public getTasksByUserId(data: TodoStub.AsObject, meta: IJwtMeta<{ id: string; }>): Observable<TaskList.AsObject> {
        return this.taskService.getTasksByUserId(meta.payload.id).pipe(
            map(tasksList => ({ tasksList })),
        );
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('TaskService', 'GetTasksStream')
    @UseFilters(RpcExceptionFilter.for('TaskService::getTasksStream'))
    public getTasksStream(data: TodoStub.AsObject, meta: IJwtMeta<{ id: string; }>): Observable<Task.AsObject> {
        return this.taskService.getTasksStream(meta.payload.id);
    }

}
