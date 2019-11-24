import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { TaskStatus } from '@grpc/proto/chat/chat.types_pb';

@Component({
    selector: 'app-add-status',
    templateUrl: './add-status.component.html',
    styleUrls: ['./add-status.component.scss'],
})
export class AddStatusComponent {

    public form = this.fb.group({
        name: [this.data.name, Validators.required],
        index: [this.data.index],
    });

    constructor(
        private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: TaskStatus.AsObject,
    ) {
    }
}
