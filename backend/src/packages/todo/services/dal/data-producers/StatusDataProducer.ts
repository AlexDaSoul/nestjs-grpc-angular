import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';

import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { TaskStatusEntity } from '../db/entities/StatusEntity';
import { StatusDataFinder } from '../data-finders/StatusDataFinder';

@Injectable()
export class StatusDataProducer {

    constructor(
        @InjectRepository(TaskStatusEntity)
        private readonly taskStatusRepository: Repository<TaskStatusEntity>,
        private readonly statusDataFinder: StatusDataFinder,
    ) {
    }

    public addStatus(data: DeepPartial<TaskStatusEntity>, userid: string): Observable<TaskStatusEntity> {
        data.index = data.index ? data.index : 0;

        return this.statusDataFinder.getStatusByConditions({ name: data.name }).pipe(
            map(() => this.taskStatusRepository.create({ ...data, userid })),
            switchMap(status => from(this.taskStatusRepository.save(status))),
        );
    }
}
