import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { from, Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

import { Task, TaskStatus } from '../grpc-proto/todo/todo.types_pb';
import { AddTaskReq, TaskList } from '../grpc-proto/todo/task_pb';

import { TaskStatusEntity } from '../db/entities/status.entity';
import { TaskEntity } from '../db/entities/task.entity';

const INITIAL_STATUS_INDEX = 0;

@Injectable()
export class TaskService {

    constructor(
        @InjectRepository(TaskEntity)
        private readonly taskRepository: Repository<TaskEntity>,
        @InjectRepository(TaskStatusEntity)
        private readonly taskStatusRepository: Repository<TaskStatusEntity>,
    ) {
    }

    private getIndexTask(index: number): Observable<TaskStatus.AsObject> {
        return from(this.taskStatusRepository.findOne({ index }));
    }

    public addTask(data: AddTaskReq.AsObject, userid: string): Observable<Task.AsObject> {
        return this.getIndexTask(INITIAL_STATUS_INDEX).pipe(
            map(status => this.taskRepository.create({ ...data, userid, ...status })),
            switchMap(task => from(this.taskRepository.save(task))),
        );
    }

    public updateTask(data: TaskList.AsObject): Observable<void> {
        const ids = data.tasksList.map(s => s.id);
        const findTasks = this.taskRepository.findByIds(ids);

        return from(findTasks).pipe(
            map(tasks =>
                tasks.map((task, index) => {
                    const taskData = data.tasksList[index];
                    taskData.index = taskData.index ? taskData.index : 0;

                    return this.taskRepository.merge(task, taskData);
                }),
            ),
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

    public getTask(id: string): Observable<Task.AsObject> {
        return from(this.taskRepository.findOne(id));
    }

    public getTasksByUserId(userid: string): Observable<Task.AsObject[]> {
        return from(this.taskRepository.find({ userid }));
    }

    public getTasksStream(userid: string): Observable<Task.AsObject> {
        return TaskEntity.subscribe().pipe(
            map(task => (task ? task : new TaskEntity())),
            filter(task => task.userid === userid),
        );
    }
}
