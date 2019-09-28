import { Injectable } from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TaskStatus } from '../../grpc-proto/todo/todo.types_pb';
import { AddStatusReq, StatusList } from '../../grpc-proto/todo/status_pb';

import { StatusDataFinder } from '../../services/dal/data-finders/StatusDataFinder';
import { StatusDataProducer } from '../../services/dal/data-producers/StatusDataProducer';
import { StatusDataUpdater } from '../../services/dal/data-updaters/StatusDataUpdater';
import { StatusDataRemover } from '../../services/dal/data-removers/StatusDataRemover';

@Injectable()
export class StatusService {

    constructor(
        private readonly statusDataFinder: StatusDataFinder,
        private readonly statusDataProducer: StatusDataProducer,
        private readonly statusDataUpdater: StatusDataUpdater,
        private readonly statusDataRemover: StatusDataRemover,
    ) {
    }

    public addStatus(data: AddStatusReq.AsObject, userid: string): Observable<TaskStatus.AsObject> {
        return this.statusDataProducer.addStatus(data, userid);
    }

    public updateStatus(data: StatusList.AsObject): Observable<void> {
        return this.statusDataUpdater.updateStatuses(data.statusesList)
            .pipe(map(() => null));
    }

    public deleteStatus(id: string): Observable<void> {
        return this.statusDataRemover.deleteStatus(id)
            .pipe(map(() => null));
    }

    public getStatus(id: string): Observable<TaskStatus.AsObject> {
        return this.statusDataFinder.getStatusOne(id);
    }

    public getStatuses(userid: string): Observable<TaskStatus.AsObject[]> {
        return this.statusDataFinder.getStatusesByUserId(userid);
    }

    public getStatusesWithTasks(userid: string): Observable<TaskStatus.AsObject[]> {
        return this.statusDataFinder.getStatusesWithTasks(userid);
    }

}
