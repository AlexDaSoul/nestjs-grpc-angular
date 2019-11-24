import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

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
            panelClass: 'chat',
            data: {
                index: index || 0,
            },
        });
    }
}
