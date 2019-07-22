import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { TaskStatus } from '@grpc/proto/todo/todo.types_pb';

@Component({
    selector: 'app-edit-status',
    templateUrl: './edit-status.component.html',
    styleUrls: ['./edit-status.component.scss'],
})
export class EditStatusComponent implements OnInit {

    public form = this.fb.group({
        name: [this.data.name, Validators.required],
        root: [this.data.root],
    });

    constructor(
        private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: TaskStatus.AsObject,
    ) {
    }

    ngOnInit() {
    }
}
