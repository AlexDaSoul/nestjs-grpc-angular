import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { TaskStatus } from '@grpc/proto/todo/todo.types_pb';
import { EditStatusComponent } from '@share/components/popups/edit-status/edit-status.component';

@Injectable({
    providedIn: 'root',
})
export class PopupService {

    constructor(private dialog: MatDialog) {
    }

    public openEditStatus(data?: TaskStatus.AsObject): MatDialogRef<EditStatusComponent> {
        return this.dialog.open(EditStatusComponent, {
            width: '490px',
            data: data || {},
        });
    }

}
