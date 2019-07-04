import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Metadata } from 'grpc-web';

import { grpcUnary } from '@grpc/helpers/grpc-unary';
import { grpcStream } from '@grpc/helpers/grpc-stream';
import { grpcJwtMetadata } from '@grpc/helpers/grpc-metadata';
import { TodoServicePromiseClient } from '@grpc/proto/todo/todo_grpc_web_pb';
import { AddTaskReq, TaskStatusRes, TaskReq, TaskListRes } from '@grpc/proto/todo/todo_pb';
import { Task, TodoStub } from '@grpc/proto/todo/todo.types_pb';

@Injectable({
    providedIn: 'root',
})
export class TodoGrpcService {

    constructor(private client: TodoServicePromiseClient) {
    }

    public addTask(data: AddTaskReq.AsObject): Observable<TaskStatusRes.AsObject> {
        const req = new AddTaskReq();
        const meta: Metadata = grpcJwtMetadata();

        req.setTitle(data.title);
        req.setText(data.text);

        return grpcUnary<TaskStatusRes.AsObject>(this.client.addTask(req, meta));
    }

    public deleteTask(data: TaskReq.AsObject): Observable<TaskStatusRes.AsObject> {
        const req = new TaskReq();
        const meta: Metadata = grpcJwtMetadata();

        req.setId(data.id);

        return grpcUnary<TaskStatusRes.AsObject>(this.client.deleteTask(req, meta));
    }

    public updateTask(data: Task.AsObject): Observable<TaskStatusRes.AsObject> {
        const req = new Task();
        const meta: Metadata = grpcJwtMetadata();

        req.setId(data.id);
        req.setUserid(data.userid);
        req.setTitle(data.title);
        req.setText(data.text);
        req.setStatus(data.status);

        return grpcUnary<TaskStatusRes.AsObject>(this.client.updateTask(req, meta));
    }

    public getTask(data: TaskReq.AsObject): Observable<Task.AsObject> {
        const req = new TaskReq();
        const meta: Metadata = grpcJwtMetadata();

        req.setId(data.id);

        return grpcUnary<Task.AsObject>(this.client.getTask(req, meta));
    }

    public getTasksByUserId(): Observable<TaskListRes.AsObject> {
        const req = new TodoStub();
        const meta: Metadata = grpcJwtMetadata();

        return grpcUnary<TaskListRes.AsObject>(this.client.getTasksByUserId(req, meta));
    }

    public getTasksStream(): Observable<Task.AsObject> {
        const req = new TodoStub();
        const meta: Metadata = grpcJwtMetadata();

        return grpcStream<Task.AsObject>(this.client.getTasksStream(req, meta));
    }
}
