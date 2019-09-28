import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';

import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { TaskEntity } from '../db/entities/TaskEntity';
import { TaskDataFinder } from '../data-finders/TaskDataFinder';

@Injectable()
export class TaskDataProducer {

    constructor(
        @InjectRepository(TaskEntity)
        private readonly taskRepository: Repository<TaskEntity>,
        private readonly taskDataFinder: TaskDataFinder,
    ) {
    }

    public addTask(data: DeepPartial<TaskEntity>, userid: string, index: number): Observable<TaskEntity> {
        return this.taskDataFinder.getTaskByConditions({ index }).pipe(
            map(task => this.taskRepository.create({ ...data, userid, ...task })),
            switchMap(task => from(this.taskRepository.save(task))),
        );
    }
}
