import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Metadata } from 'grpc-web';

import { grpcUnary } from '@grpc/helpers/grpc-unary';
import { grpcJwtMetadata } from '@grpc/helpers/grpc-metadata';
import { StatusServicePromiseClient } from '@grpc/proto/todo/status_grpc_web_pb';
import { AddStatusReq, StatusReq, StatusList } from '@grpc/proto/todo/status_pb';
import { TaskStatus, TaskStatusRes, TodoStub } from '@grpc/proto/todo/todo.types_pb';

@Injectable({
    providedIn: 'root',
})
export class StatusGrpcService {

    constructor(private client: StatusServicePromiseClient) {
    }

    public addStatus(data: AddStatusReq.AsObject): Observable<TaskStatusRes.AsObject> {
        const req = new AddStatusReq();
        const meta: Metadata = grpcJwtMetadata();

        req.setName(data.name);
        req.setIndex(data.index);

        return grpcUnary<TaskStatusRes.AsObject>(this.client.addStatus(req, meta));
    }

    public updateStatus(data: TaskStatus.AsObject[]): Observable<TaskStatusRes.AsObject> {
        const req = new StatusList();
        const meta: Metadata = grpcJwtMetadata();

        data.forEach((obj, index) => {
            const status = new TaskStatus();

            status.setId(obj.id);
            status.setIndex(obj.index);
            status.setName(obj.name);

            req.addStatuses(status, index);
        });

        return grpcUnary<TaskStatusRes.AsObject>(this.client.updateStatus(req, meta));
    }

    public deleteStatus(data: StatusReq.AsObject): Observable<TaskStatusRes.AsObject> {
        const req = new StatusReq();
        const meta: Metadata = grpcJwtMetadata();

        req.setId(data.id);

        return grpcUnary<TaskStatusRes.AsObject>(this.client.deleteStatus(req, meta));
    }

    public getStatus(data: StatusReq.AsObject): Observable<TaskStatus.AsObject> {
        const req = new StatusReq();
        const meta: Metadata = grpcJwtMetadata();

        req.setId(data.id);

        return grpcUnary<TaskStatus.AsObject>(this.client.getStatus(req, meta));
    }

    public getStatuses(): Observable<StatusList.AsObject> {
        const req = new TodoStub();
        const meta: Metadata = grpcJwtMetadata();

        return grpcUnary<StatusList.AsObject>(this.client.getStatuses(req, meta));
    }

    public getStatusesWithTasks(): Observable<StatusList.AsObject> {
        const req = new TodoStub();
        const meta: Metadata = grpcJwtMetadata();

        return grpcUnary<StatusList.AsObject>(this.client.getStatusesWithTasks(req, meta));
    }
}
