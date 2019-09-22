import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { TaskStatus } from '../grpc-proto/todo/todo.types_pb';
import { AddStatusReq, StatusList } from '../grpc-proto/todo/status_pb';

import { TaskStatusEntity } from '../db/entities/status.entity';

@Injectable()
export class StatusService {

    constructor(
        @InjectRepository(TaskStatusEntity)
        private readonly taskStatusRepository: Repository<TaskStatusEntity>,
    ) {
    }

    public addStatus(data: AddStatusReq.AsObject, userid: string): Observable<TaskStatus.AsObject> {
        data.index = data.index ? data.index : 0;

        const status = this.taskStatusRepository.create({ ...data, userid });

        return from(this.taskStatusRepository.save(status));
    }

    public updateStatus(data: StatusList.AsObject): Observable<void> {
        const ids = data.statusesList.map(s => s.id);
        const findStatuses = this.taskStatusRepository.findByIds(ids);

        return from(findStatuses).pipe(
            map(statuses =>
                 statuses.map((status, index) => {
                     const statusData = data.statusesList[index];
                     statusData.index = statusData.index ? statusData.index : 0;

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

    public getStatus(id: string): Observable<TaskStatus.AsObject> {
        return from(this.taskStatusRepository.findOne(id));
    }

    public getStatuses(userid: string): Observable<TaskStatus.AsObject[]> {
        return from(this.taskStatusRepository.find({ userid }));
    }

    public getStatusesWithTasks(userid: string): Observable<TaskStatus.AsObject[]> {
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
