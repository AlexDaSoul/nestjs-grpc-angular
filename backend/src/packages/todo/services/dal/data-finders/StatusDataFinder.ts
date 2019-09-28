import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindConditions } from 'typeorm';

import { from, Observable } from 'rxjs';

import { TaskStatusEntity } from '../db/entities/StatusEntity';

@Injectable()
export class StatusDataFinder {

    constructor(
        @InjectRepository(TaskStatusEntity)
        private readonly taskStatusRepository: Repository<TaskStatusEntity>,
    ) {
    }

    public getStatusOne(id: string): Observable<TaskStatusEntity> {
        return from(this.taskStatusRepository.findOne(id));
    }

    public getStatusByConditions(conditions: FindConditions<TaskStatusEntity>): Observable<TaskStatusEntity> {
        return from(this.taskStatusRepository.findOne(conditions));
    }

    public getStatusByIds(ids: string[]): Observable<TaskStatusEntity[]> {
        return from(this.taskStatusRepository.findByIds(ids));
    }

    public getStatusesByUserId(userid: string): Observable<TaskStatusEntity[]> {
        return from(this.taskStatusRepository.find({ userid }));
    }

    public getStatusesWithTasks(userid: string): Observable<TaskStatusEntity[]> {
        const query = this.taskStatusRepository
            .createQueryBuilder('status')
            .leftJoinAndSelect('status.tasks', 'task')
            .orderBy({
                'status.index': 'ASC',
                'task.index': 'ASC',
            })
            .where({ userid })
            .getMany();

        return from(query);
    }
}
