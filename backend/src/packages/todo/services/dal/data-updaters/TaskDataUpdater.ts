import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';

import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { TaskEntity } from '../db/entities/TaskEntity';
import { TaskDataFinder } from '../data-finders/TaskDataFinder';

@Injectable()
export class TaskDataUpdater {

    constructor(
        @InjectRepository(TaskEntity)
        private readonly taskRepository: Repository<TaskEntity>,
        private readonly taskDataFinder: TaskDataFinder,
    ) {
    }

    public updateTasks(taskList: DeepPartial<TaskEntity[]>): Observable<TaskEntity[]> {
        const ids = taskList.map(s => s.id);

        return from(this.taskDataFinder.getTasksByIds(ids)).pipe(
            map(tasks =>
                tasks.map((task, index) => {
                    const updateData = taskList[index];
                    updateData.index = updateData.index ? updateData.index : 0;

                    return this.taskRepository.merge(task, updateData);
                }),
            ),
            switchMap(tasks => from(this.taskRepository.save(tasks))),
        );
    }
}
