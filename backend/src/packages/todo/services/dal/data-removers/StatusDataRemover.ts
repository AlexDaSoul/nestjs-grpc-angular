import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { TaskStatusEntity } from '../db/entities/StatusEntity';
import { StatusDataFinder } from '../data-finders/StatusDataFinder';

@Injectable()
export class StatusDataRemover {

    constructor(
        @InjectRepository(TaskStatusEntity)
        private readonly taskStatusRepository: Repository<TaskStatusEntity>,
        private readonly statusDataFinder: StatusDataFinder,
    ) {
    }

    public deleteStatus(id: string): Observable<TaskStatusEntity[]> {
        return this.statusDataFinder.getStatusOne(id).pipe(
            switchMap(status => from(this.taskStatusRepository.remove([status]))),
        );
    }
}
