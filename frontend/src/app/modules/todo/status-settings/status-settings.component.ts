import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { NGXLogger } from 'ngx-logger';
import { Observable } from 'rxjs';
import { map, switchMap, filter } from 'rxjs/operators';

import { StatusGrpcService } from '@grpc/services/todo/status.service';
import { TaskStatus } from '@grpc/proto/todo/todo.types_pb';
import { PopupService } from '@share/services/popup.service';

@Component({
    selector: 'app-status-settings',
    templateUrl: './status-settings.component.html',
    styleUrls: ['./status-settings.component.scss'],
})
export class StatusSettingsComponent implements OnInit {

    public statuses$: Observable<TaskStatus.AsObject[]> = this.statusGrpcService.getStatuses({}).pipe(
        map(statuses => statuses.statusesList.sort((a, b) => a.index - b.index)),
    );

    constructor(
        private statusGrpcService: StatusGrpcService,
        private popupService: PopupService,
        private logger: NGXLogger,
    ) {
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
        ).subscribe(
            data => this.logger.debug(data),
            err => this.logger.error(err),
        );
    }

    public addStatus(): void {

    }

    public editStatus(statuses: TaskStatus.AsObject[], index: number): void {
        const status = statuses[index];
        const dialogRef = this.popupService.openEditStatus(status);

        dialogRef.afterClosed()
            .pipe(
                filter(data => !!data),
                map(data => (statuses[index] = { ...status, ...data })),
                switchMap(data => this.statusGrpcService.updateStatus([data])),
            )
            .subscribe(
                data => this.logger.debug(data),
                err => this.logger.error(err),
            );
    }

    public deleteStatus(index: number): void {

    }
}
