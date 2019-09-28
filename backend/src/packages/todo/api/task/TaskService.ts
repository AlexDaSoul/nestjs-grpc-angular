import { Injectable } from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Task } from '../../grpc-proto/todo/todo.types_pb';
import { AddTaskReq, TaskList } from '../../grpc-proto/todo/task_pb';

import { TaskDataFinder } from '../../services/dal/data-finders/TaskDataFinder';
import { TaskDataProducer } from '../../services/dal/data-producers/TaskDataProducer';
import { TaskDataRemover } from '../../services/dal/data-removers/TaskDataRemover';
import { TaskDataUpdater } from '../../services/dal/data-updaters/TaskDataUpdater';

const INITIAL_STATUS_INDEX = 0;

@Injectable()
export class TaskService {

    constructor(
        private readonly taskDataFinder: TaskDataFinder,
        private readonly taskDataProducer: TaskDataProducer,
        private readonly taskDataUpdater: TaskDataUpdater,
        private readonly taskDataRemover: TaskDataRemover,
    ) {
    }

    public addTask(data: AddTaskReq.AsObject, userid: string): Observable<Task.AsObject> {
        return this.taskDataProducer.addTask(data, userid, INITIAL_STATUS_INDEX);
    }

    public updateTask(data: TaskList.AsObject): Observable<void> {
        return this.taskDataUpdater.updateTasks(data.tasksList)
            .pipe(map(() => null));
    }

    public deleteTask(id: string): Observable<void> {
        return this.taskDataRemover.deleteTask(id)
            .pipe(map(() => null));
    }

    public getTask(id: string): Observable<Task.AsObject> {
        return this.taskDataFinder.getTaskOne(id);
    }

    public getTasksByUserId(userid: string): Observable<Task.AsObject[]> {
        return this.taskDataFinder.getTaskByUserId(userid);
    }

    public getTasksStream(userid: string): Observable<Task.AsObject> {
        return this.taskDataFinder.getTasksStream(userid);
    }
}
