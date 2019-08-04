import { Component, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { NGXLogger } from 'ngx-logger';
import { map, switchMap, filter, tap } from 'rxjs/operators';

import { StatusGrpcService } from '@grpc/services/todo/status.service';
import { TaskStatus } from '@grpc/proto/todo/todo.types_pb';
import { AddStatusService } from '@share/services/add-status.service';
import { EditStatusService } from '@share/services/edit-status.service';
import { ConfirmPopupService } from '@share/services/confirm-popup.service';

@Component({
    selector: 'app-status-settings',
    templateUrl: './status-settings.component.html',
    styleUrls: ['./status-settings.component.scss'],
})
export class StatusSettingsComponent {

    @Input() public statuses: TaskStatus.AsObject[];

    constructor(
        private statusGrpcService: StatusGrpcService,
        private addStatusService: AddStatusService,
        private editStatusService: EditStatusService,
        private confirmPopupService: ConfirmPopupService,
        private logger: NGXLogger,
    ) {
    }

    public drop(event: CdkDragDrop<TaskStatus.AsObject[]>): void {
        moveItemInArray(this.statuses, event.previousIndex, event.currentIndex);

        this.statuses[event.previousIndex].index = event.previousIndex;
        this.statuses[event.currentIndex].index = event.currentIndex;

        this.statusGrpcService.updateStatus(
            [
                this.statuses[event.previousIndex],
                this.statuses[event.currentIndex],
            ],
        ).subscribe(
            data => this.logger.debug(data),
            err => this.logger.error(err),
        );
    }

    public addStatus(): void {
        const dialogRef = this.addStatusService.openAddStatus(this.statuses.length);

        dialogRef.afterClosed()
            .pipe(
                filter(data => !!data),
                map(data => (this.statuses[this.statuses.length] = data)),
                switchMap(data => this.statusGrpcService.addStatus(data)),
            )
            .subscribe(
                data => this.logger.debug(data),
                err => this.logger.error(err),
            );
    }

    public editStatus(index: number): void {
        const status = this.statuses[index];
        const dialogRef = this.editStatusService.openEditStatus(status);

        dialogRef.afterClosed()
            .pipe(
                filter(data => !!data),
                map(data => (this.statuses[index] = { ...status, ...data })),
                switchMap(data => this.statusGrpcService.updateStatus([data])),
            )
            .subscribe(
                data => this.logger.debug(data),
                err => this.logger.error(err),
            );
    }

    public deleteStatus(index: number): void {
        const dialogRef = this.confirmPopupService.openConfirmPopup({
            question: 'Are you sure you want to delete this status?',
        });

        dialogRef.afterClosed()
            .pipe(
                filter(data => !!data),
                switchMap(data => this.statusGrpcService.deleteStatus(this.statuses[index])),
                tap(() => this.statuses.splice(index, 1)),
            )
            .subscribe(
                data => this.logger.debug(data),
                err => this.logger.error(err),
            );
    }
}
