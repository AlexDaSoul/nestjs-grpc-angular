import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindConditions } from 'typeorm';

import { from, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { TaskEntity } from '../db/entities/TaskEntity';

@Injectable()
export class TaskDataFinder {

    constructor(
        @InjectRepository(TaskEntity)
        private readonly taskRepository: Repository<TaskEntity>,
    ) {
    }

    public getTaskOne(id: string): Observable<TaskEntity> {
        return from(this.taskRepository.findOne(id));
    }

    public getTaskByConditions(conditions: FindConditions<TaskEntity>): Observable<TaskEntity> {
        return from(this.taskRepository.findOne(conditions));
    }

    public getTasksByIds(ids: string[]): Observable<TaskEntity[]> {
        return from(this.taskRepository.findByIds(ids));
    }

    public getTaskByUserId(userid: string): Observable<TaskEntity[]> {
        return from(this.taskRepository.find({ userid }));
    }

    public getTasksStream(userid: string): Observable<TaskEntity> {
        return TaskEntity.subscribe().pipe(
            map(task => (task ? task : new TaskEntity())),
            filter(task => task.userid === userid),
        );
    }
}
