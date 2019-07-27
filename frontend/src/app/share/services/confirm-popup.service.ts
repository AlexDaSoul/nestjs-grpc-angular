import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { ConfirmComponent } from '@share/components/popups/confirm/confirm.component';

@Injectable({
    providedIn: 'root',
})
export class ConfirmPopupService {

    constructor(private dialog: MatDialog) {
    }

    public openConfirmPopup(data: { question: string; }): MatDialogRef<ConfirmComponent> {
        return this.dialog.open(ConfirmComponent, {
            width: '400px',
            panelClass: 'todo',
            data: data || {},
        });
    }

}
