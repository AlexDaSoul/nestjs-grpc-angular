import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { StatusGrpcService } from '@grpc/services/todo/status.service';
import { TaskStatus } from '@grpc/proto/todo/todo.types_pb';

@Component({
    selector: 'app-status-settings',
    templateUrl: './status-settings.component.html',
    styleUrls: ['./status-settings.component.scss'],
})
export class StatusSettingsComponent implements OnInit {

    public statuses$: Observable<TaskStatus.AsObject[]> = this.statusGrpcService.getStatuses({}).pipe(
        map(statuses => statuses.statusesList.sort((a, b) => a.index - b.index)),
    );

    constructor(private statusGrpcService: StatusGrpcService) {
    }

    ngOnInit() {
    }

    public drop(event: CdkDragDrop<TaskStatus.AsObject[]>, statuses: TaskStatus.AsObject[]): void {
        moveItemInArray(statuses, event.previousIndex, event.currentIndex);

        statuses[event.previousIndex].index = event.previousIndex;
        statuses[event.currentIndex].index = event.currentIndex;

        this.statusGrpcService.updateStatus(
            [
                statuses[event.previousIndex],
                statuses[event.currentIndex],
            ],
        );
    }

    public addStatus(): void {

    }
}
