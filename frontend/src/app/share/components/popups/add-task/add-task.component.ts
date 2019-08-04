import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { Board, Task } from '@grpc/proto/todo/todo.types_pb';
import { User } from '@grpc/proto/user/user.types_pb';
import { UserGrpcService } from '@grpc/services/user/user.service';
import { BoardService } from '@grpc/services/todo/board.service';

@Component({
    selector: 'app-add-task',
    templateUrl: './add-task.component.html',
    styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit, OnDestroy {

    private ngOnDestroy$: Subject<void> = new Subject();

    public form: FormGroup = this.fb.group({
        board: [null, Validators.required],
        assign: [{ value: null, disabled: true, validators: Validators.required}],
        title: [null, Validators.required],
        description: [null, Validators.required],
    });

    public boards$: Observable<Board.AsObject[]> = this.boardService.getUserBoards().pipe(
        map(data => data.boardsList),
    );

    public users$: Observable<User.AsObject[]> = this.userGrpcService.getUsersById().pipe(
        map(users => users.usersList),
    );

    constructor(
        private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: Task.AsObject,
        private userGrpcService: UserGrpcService,
        private boardService: BoardService,
    ) {
    }

    ngOnInit() {
        this.form.get('board').statusChanges
            .pipe(takeUntil(this.ngOnDestroy$))
            .subscribe(data => {
                console.log(data)
                if (data === 'VALID') {
                  //  this.form.get('assign').enable();
                }
            });
    }

    ngOnDestroy() {
        this.ngOnDestroy$.next();
    }
}
