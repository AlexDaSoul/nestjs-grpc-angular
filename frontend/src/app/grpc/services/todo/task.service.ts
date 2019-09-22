import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Metadata } from 'grpc-web';

import { grpcUnary } from '@grpc/helpers/grpc-unary';
import { grpcStream } from '@grpc/helpers/grpc-stream';
import { grpcJwtMetadata } from '@grpc/helpers/grpc-metadata';
import { TaskServicePromiseClient } from '@grpc/proto/todo/task_grpc_web_pb';
import { AddTaskReq, TaskReq, TaskList } from '@grpc/proto/todo/task_pb';
import { Task, TodoStub, TaskStatusRes } from '@grpc/proto/todo/todo.types_pb';

@Injectable({
    providedIn: 'root',
})
export class TaskGrpcService {

    constructor(private client: TaskServicePromiseClient) {
    }

    public addTask(data: AddTaskReq.AsObject): Observable<TaskStatusRes.AsObject> {
        const req = new AddTaskReq();
        const meta: Metadata = grpcJwtMetadata();

        req.setTitle(data.title);
        req.setDescription(data.description);

        return grpcUnary<TaskStatusRes.AsObject>(this.client.addTask(req, meta));
    }

    public deleteTask(data: TaskReq.AsObject): Observable<TaskStatusRes.AsObject> {
        const req = new TaskReq();
        const meta: Metadata = grpcJwtMetadata();

        req.setId(data.id);

        return grpcUnary<TaskStatusRes.AsObject>(this.client.deleteTask(req, meta));
    }

    public updateTask(data: Task.AsObject[]): Observable<TaskStatusRes.AsObject> {
        const req = new TaskList();
        const meta: Metadata = grpcJwtMetadata();

        data.forEach((obj, index) => {
            const task = new Task();

            task.setId(obj.id);
            task.setUserid(obj.userid);
            task.setIndex(obj.index);
            task.setTitle(obj.title);
            task.setDescription(obj.description);
            task.setStatus(obj.status);

            req.addTasks(task, index);
        });

        return grpcUnary<TaskStatusRes.AsObject>(this.client.updateTask(req, meta));
    }

    public getTask(data: TaskReq.AsObject): Observable<Task.AsObject> {
        const req = new TaskReq();
        const meta: Metadata = grpcJwtMetadata();

        req.setId(data.id);

        return grpcUnary<Task.AsObject>(this.client.getTask(req, meta));
    }

    public getTasksByUserId(): Observable<TaskList.AsObject> {
        const req = new TodoStub();
        const meta: Metadata = grpcJwtMetadata();

        return grpcUnary<TaskList.AsObject>(this.client.getTasksByUserId(req, meta));
    }

    public getTasksStream(): Observable<Task.AsObject> {
        const req = new TodoStub();
        const meta: Metadata = grpcJwtMetadata();

        return grpcStream<Task.AsObject>(this.client.getTasksStream(req, meta));
    }
}
