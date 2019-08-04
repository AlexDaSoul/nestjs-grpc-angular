import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { Task } from '@grpc/proto/todo/todo.types_pb';
import { AddTaskComponent } from '@share/components/popups/add-task/add-task.component';

@Injectable({
    providedIn: 'root',
})
export class AddTaskService {

    constructor(private dialog: MatDialog) {
    }

    public openAddTask(data?: { task?: Task.AsObject }): MatDialogRef<AddTaskComponent> {
        return this.dialog.open(AddTaskComponent, {
            width: '560px',
            panelClass: 'todo',
            data: data || {},
        });
    }
}
