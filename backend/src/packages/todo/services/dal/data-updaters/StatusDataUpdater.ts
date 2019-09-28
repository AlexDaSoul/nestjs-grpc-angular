import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';

import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { TaskStatusEntity } from '../db/entities/StatusEntity';
import { StatusDataFinder } from '../data-finders/StatusDataFinder';

@Injectable()
export class StatusDataUpdater {

    constructor(
        @InjectRepository(TaskStatusEntity)
        private readonly taskStatusRepository: Repository<TaskStatusEntity>,
        private readonly statusDataFinder: StatusDataFinder,
    ) {
    }

    public updateStatuses(statusList: DeepPartial<TaskStatusEntity[]>): Observable<TaskStatusEntity[]> {
        const ids = statusList.map(s => s.id);

        return from(this.statusDataFinder.getStatusByIds(ids)).pipe(
            map(statuses =>
                statuses.map((status, index) => {
                    const updateData = statusList[index];
                    updateData.index = updateData.index ? updateData.index : 0;

                    return this.taskStatusRepository.merge(status, updateData);
                }),
            ),
            switchMap(statuses => from(this.taskStatusRepository.save(statuses))),
        );
    }
}
