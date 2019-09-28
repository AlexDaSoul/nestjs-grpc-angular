import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { TaskEntity } from '../db/entities/TaskEntity';
import { TaskDataFinder } from '../data-finders/TaskDataFinder';

@Injectable()
export class TaskDataRemover {

    constructor(
        @InjectRepository(TaskEntity)
        private readonly taskRepository: Repository<TaskEntity>,
        private readonly taskDataFinder: TaskDataFinder,
    ) {
    }

    public deleteTask(id: string): Observable<TaskEntity[]> {
        return this.taskDataFinder.getTaskOne(id).pipe(
            switchMap(task => from(this.taskRepository.remove([task]))),
        );
    }
}
