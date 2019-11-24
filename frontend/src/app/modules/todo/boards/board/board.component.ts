import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';

import { StatusGrpcService } from '@grpc/services/todo/status.service';
import { TaskStatus, Task } from '@grpc/proto/chat/chat.types_pb';
import { TaskGrpcService } from '@grpc/services/todo/task.service';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {

    public statusIds: string[];
    public statuses$: Observable<TaskStatus.AsObject[]> = this.statusGrpcService.getStatusesWithTasks().pipe(
        map((data) => data.statusesList),
        filter(statuses => statuses.length > 0),
       // tap(statuses => statuses.map(chat => chat.tasksList.sort((a, b) => a.index > b.index))),
        tap(statuses => this.getStatusIds(statuses)),
    );

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private statusGrpcService: StatusGrpcService,
        private taskGrpcService: TaskGrpcService,
        private logger: NGXLogger,
    ) {
    }

    ngOnInit() {
        /*        this.taskGrpcService.getTasksStream().subscribe(
                    (data) => {
                        console.log(data);
                    },
                    err => {
                        console.log(err);
                    },
                );*/
    }

    private getStatusIds(statuses: TaskStatus.AsObject[]): void {
        this.statusIds = statuses.reduce((ids: string[], status: TaskStatus.AsObject) => {
            return [...ids, status.id];
        }, []);
    }

    public drop(event: CdkDragDrop<Task.AsObject[]>): void {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex);
        }

        event.previousContainer.data.forEach((task, index) => {
            task.index = index;
        });

        event.container.data.forEach((task, index) => {
            task.index = index;
            task.status = event.container.id;
        });

        this.taskGrpcService.updateTask([
            ...event.previousContainer.data,
            ...event.container.data
        ]).subscribe(
            data => this.logger.debug(data),
            err => this.logger.error(err),
        );
    }
}
