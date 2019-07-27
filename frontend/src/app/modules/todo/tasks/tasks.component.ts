import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NGXLogger } from 'ngx-logger';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap, filter, tap } from 'rxjs/operators';

import { StatusGrpcService } from '@grpc/services/todo/status.service';
import { TaskStatus } from '@grpc/proto/todo/todo.types_pb';
import { TaskGrpcService } from '@grpc/services/todo/task.service';

interface ITodoTask {
    id: string;
    title: string;
    description: string;
    statusId: string;
}

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {

    public statusIds: string[];
    public statuses$: Observable<TaskStatus.AsObject[]> = this.statusGrpcService.getStatuses({}).pipe(
        map(statuses => statuses.statusesList.sort((a, b) => a.index - b.index)),
        tap(statuses => this.getStatusIds(statuses)),
    );

    constructor(
        private statusGrpcService: StatusGrpcService,
        private taskGrpcService: TaskGrpcService,
        private logger: NGXLogger,
    ) {
    }

    ngOnInit() {
        this.taskGrpcService.getTasksStream().subscribe(
            (data) => {
                console.log(data);
            },
            err => {
                console.log(err);
            },
        );
    }

    private getStatusIds(statuses: TaskStatus.AsObject[]): void {
        this.statusIds = statuses.reduce((ids: string[], status: TaskStatus.AsObject) => {
            return [...ids, status.id];
        }, []);
    }

    public drop(event: CdkDragDrop<ITodoTask[]>): void {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex);

            event.container.data[event.currentIndex].statusId = event.container.id;
        }
    }

}
