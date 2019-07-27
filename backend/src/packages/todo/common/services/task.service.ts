import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { from, Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

import { api } from '../../grpc-proto/todo/task';
import { api as apiStatus } from '../../grpc-proto/todo/status';
import { TaskStatus } from '../../db/entities/status.entity';
import { Task } from '../../db/entities/task.entity';

const INITIAL_STATUS_INDEX = 0;

@Injectable()
export class TaskService {

    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
        @InjectRepository(TaskStatus)
        private readonly taskStatusRepository: Repository<TaskStatus>,
    ) {
    }

    private getIndexTask(index: number): Observable<apiStatus.todo.TaskStatus> {
        return from(this.taskStatusRepository.findOne({ index }));
    }

    public addTask(data: api.todo.AddTaskReq, userId: string): Observable<api.todo.Task> {
        return this.getIndexTask(INITIAL_STATUS_INDEX).pipe(
            map(status => this.taskRepository.create({ ...data, userId, ...status })),
            switchMap(task => from(this.taskRepository.save(task))),
        );
    }

    public updateTask(data: api.todo.Task): Observable<void> {
        const findTask = this.taskRepository.findOne({ id: data.id });

        return from(findTask).pipe(
            map(task => this.taskRepository.merge(task, data)),
            switchMap(task => from(this.taskRepository.save(task))),
            map(() => null),
        );
    }

    public deleteTask(id: string): Observable<void> {
        const findUser = this.taskRepository.findOne({ id });

        return from(findUser).pipe(
            switchMap(task => from(this.taskRepository.remove([task]))),
            map(() => null),
        );
    }

    public getTask(id: string): Observable<api.todo.Task> {
        return from(this.taskRepository.findOne(id));
    }

    public getTasksByUserId(userId: string): Observable<api.todo.Task[]> {
        return from(this.taskRepository.find({ userId }));
    }

    public getTasksStream(userId: string): Observable<api.todo.Task> {
        return Task.subscribe().pipe(
            map(task => (task ? task : new Task())),
            filter(task => {
                console.log(task)
                return task.userId.includes(userId);
            }),
        );
    }

}
