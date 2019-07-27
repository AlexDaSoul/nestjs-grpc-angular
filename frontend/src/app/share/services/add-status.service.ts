import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { TaskStatus } from '@grpc/proto/todo/todo.types_pb';
import { AddStatusComponent } from '@share/components/popups/add-status/add-status.component';

@Injectable({
    providedIn: 'root',
})
export class AddStatusService {

    constructor(private dialog: MatDialog) {
    }

    public openAddStatus(index: number): MatDialogRef<AddStatusComponent> {
        return this.dialog.open(AddStatusComponent, {
            width: '490px',
            panelClass: 'todo',
            data: {
                index: index || 0,
            },
        });
    }
}
