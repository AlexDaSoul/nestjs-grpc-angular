import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { NGXLogger } from 'ngx-logger';
import { Observable, EMPTY } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { UserGrpcService } from '@grpc/services/user/user.service';
import { BoardService } from '@grpc/services/todo/board.service';
import { User } from '@grpc/proto/user/user.types_pb';
import { AuthService } from '@share/services/auth.service';
import { Board, TaskStatusRes } from '@grpc/proto/todo/todo.types_pb';
import { getUserIdFromJWT } from '@grpc/helpers/grpc-get-id';

@Component({
    selector: 'app-members-settings',
    templateUrl: './members-settings.component.html',
    styleUrls: ['./members-settings.component.scss'],
})
export class MembersSettingsComponent {

    @ViewChild('auto', { static: false }) private matAutocomplete: MatAutocomplete;

    @Input() private board: Board.AsObject;

    public addOnBlur: boolean = true;
    public separatorKeysCodes: number[] = [ENTER, COMMA];
    public userList: User.AsObject[];

    public users$: Observable<User.AsObject[]> = this.userGrpcService.getUsersById().pipe(
        map(users => {
            const token = this.authService.getToken();
            const id = getUserIdFromJWT(token);

            return users.usersList.filter(user => user.id !== id);
        }),
        tap(users => this.userList = users.filter(user => !this.board.membersList.includes(user.id))),
        map(users => users.filter(user => this.board.membersList.includes(user.id))),
    );

    constructor(
        private userGrpcService: UserGrpcService,
        private boardService: BoardService,
        private authService: AuthService,
        private snackBar: MatSnackBar,
        private logger: NGXLogger,
    ) {
    }

    private updateMemberList(users: User.AsObject[]): Observable<TaskStatusRes.AsObject> {
        this.board.membersList = users.map(u => u.id);

        return this.boardService.updateBoard(this.board).pipe(
            catchError(err => {
                this.snackBar.open(err.message, 'close', {
                    duration: 5000,
                    horizontalPosition: 'right',
                    verticalPosition: 'top',
                    panelClass: 'error-message',
                });

                return EMPTY;
            })
        );
    }

    public addUser(event: MatChipInputEvent): void {
        if (!this.matAutocomplete.isOpen) {
            const input = event.input;
            const value = event.value;

/*            // Add our fruit
            if ((value || '').trim()) {
                this.fruits.push(value.trim());
            }*/
        }
    }

    public removeUser(user: User.AsObject, users: User.AsObject[]): void {
        const index = users.findIndex(u => u.id === user.id);
        const newUserList = users.filter(u => u.id !== user.id);

        if (index > -1) {
            this.updateMemberList(newUserList)
                .subscribe(res => {
                    this.userList.push(user);
                    users = newUserList;
                    this.logger.debug(res);
                });
        }
    }

    public selectedUser(user: User.AsObject, users: User.AsObject[]): void {
        const index = this.userList.findIndex(u => u.id === user.id);

        if (index > -1) {
            this.updateMemberList(users)
                .subscribe(res => {
                    users.push(user);
                    this.userList.splice(index, 1);
                    this.logger.debug(res);
                });
        }
    }

}
