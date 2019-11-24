import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { Task } from '@grpc/proto/chat/chat.types_pb';
import { User } from '@grpc/proto/user/user.types_pb';
import { UserGrpcService } from '@grpc/services/user/user.service';

@Component({
    selector: 'app-add-task',
    templateUrl: './add-task.component.html',
    styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit, OnDestroy {

    private ngOnDestroy$: Subject<void> = new Subject();

    public form: FormGroup = this.fb.group({
        title: [null, Validators.required],
        description: [null, Validators.required],
    });

    public users$: Observable<User.AsObject[]> = this.userGrpcService.getUsersById().pipe(
        map(users => users.usersList),
    );

    constructor(
        private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: Task.AsObject,
        private userGrpcService: UserGrpcService,
    ) {
    }

    ngOnInit() {

    }

    ngOnDestroy() {
        this.ngOnDestroy$.next();
    }
}
