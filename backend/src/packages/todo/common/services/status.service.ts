import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { api } from '../../grpc-proto/todo/status';
import { TaskStatus } from '../../db/entities/status.entity';

@Injectable()
export class StatusService {

    constructor(
        @InjectRepository(TaskStatus)
        private readonly taskStatusRepository: Repository<TaskStatus>,
    ) {
    }

    public addStatus(data: api.todo.AddStatusReq, userId: string): Observable<api.todo.TaskStatus> {
        data.index = data.index ? data.index : 0;
        data.root = data.root ? data.root : false;

        const status = this.taskStatusRepository.create({ ...data, userId });

        return from(this.taskStatusRepository.save(status));
    }

    public updateStatus(data: api.todo.StatusList): Observable<void> {
        const ids = data.statuses.map(s => s.id);
        const findTasks = this.taskStatusRepository.findByIds(ids);

        return from(findTasks).pipe(
            map(statuses =>
                 statuses.map((status, index) => {
                     const statusData = data.statuses[index];
                     statusData.index = statusData.index ? statusData.index : 0;
                     statusData.root = statusData.root ? statusData.root : false;

                     return this.taskStatusRepository.merge(status, statusData);
                 }),
            ),
            switchMap(statuses => from(this.taskStatusRepository.save(statuses))),
            map(() => null),
        );
    }

    public deleteStatus(id: string): Observable<void> {
        const findUser = this.taskStatusRepository.findOne({ id });

        return from(findUser).pipe(
            switchMap(status => from(this.taskStatusRepository.remove([status]))),
            map(() => null),
        );
    }

    public getStatus(id: string): Observable<api.todo.TaskStatus> {
        return from(this.taskStatusRepository.findOne(id));
    }

    public getStatuses(board: string): Observable<api.todo.TaskStatus[]> {
        return from(this.taskStatusRepository.find({ board }));
    }

    public getStatusesWithTasks(board: string): Observable<api.todo.TaskStatus[]> {
        const query = this.taskStatusRepository
            .createQueryBuilder('status')
            .leftJoinAndSelect('status.tasks', 'tasks')
            .orderBy('status.index', 'ASC')
            .where({ board })
            .getMany();

        return from(query)
    }

}
