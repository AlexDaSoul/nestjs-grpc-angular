import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { from, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { api } from '../../grpc-proto/todo/todo';
import { Task } from '../entities/task.entity';

const TODO_ACTION_SUCCESS = 1;
const TODO_ACTION_ERROR = 2;

@Injectable()
export class TaskService {

    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
    ) {
    }

    public addTask(data: api.todo.TaskReq, userId: string): Observable<api.todo.TaskStatusRes> {
        const findUser = this.taskRepository.findOne({ id: data.task.id });

        return from(findUser).pipe(
            map(() => {
                return {
                    status: TODO_ACTION_SUCCESS,
                };
            }),
            catchError(err => {
                return throwError({
                    status: TODO_ACTION_ERROR,
                    message: `Invalid credentials: ${err}`,
                });
            }),
        );
    }

    public updateTask(data: api.todo.TaskReq, userId: string): Observable<api.todo.TaskStatusRes> {
        const findUser = this.taskRepository.findOne({ id: data.task.id });

        return from(findUser).pipe(
            map(() => {
                return {
                    status: TODO_ACTION_SUCCESS,
                };
            }),
            catchError(err => {
                return throwError({
                    status: TODO_ACTION_ERROR,
                    message: `Invalid credentials: ${err}`,
                });
            }),
        );
    }

    public deleteTask(data: api.todo.DeleteTaskReq, userId: string): Observable<api.todo.TaskStatusRes> {
        const findUser = this.taskRepository.findOne({ ...data });

        return from(findUser).pipe(
            map(() => {
                return {
                    status: TODO_ACTION_SUCCESS,
                };
            }),
            catchError(err => {
                return throwError({
                    status: TODO_ACTION_ERROR,
                    message: `Invalid credentials: ${err}`,
                });
            }),
        );
    }

    public getTasksStream(data: api.todo.TodoStub, userId: string): Observable<api.todo.TaskListRes> {
        const findUser = this.taskRepository.findOne({ ...data });

        return from(findUser).pipe(
            map(() => {
                return {
                    tasks: [],
                };
            }),
            catchError(err => {
                return throwError({
                    status: TODO_ACTION_ERROR,
                    message: `Invalid credentials: ${err}`,
                });
            }),
        );
    }

}
