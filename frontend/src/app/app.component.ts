import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

import { jwtAuthError$ } from '@grpc/helpers/grpc-jwt';
import { User } from '@grpc/proto/user/user.types_pb';
import { TaskGrpcService } from '@grpc/services/todo/task.service';
import { AuthService } from '@share/services/auth.service';
import { UserStoreService } from '@share/services/user-store.service';
import { AddTaskService } from '@share/services/add-task.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

    public user$: Observable<User.AsObject> = this.userStoreService.getUser();

    constructor(
        private logger: NGXLogger,
        private authService: AuthService,
        private userStoreService: UserStoreService,
        private addTaskService: AddTaskService,
        private taskGrpcService: TaskGrpcService,
    ) {
    }

    ngOnInit() {
        jwtAuthError$.asObservable()
            .subscribe(() => {
                this.logout();
                this.logger.warn('JWT is not valid');
            });
    }

    public logout(): void {
        this.authService.logout();
        this.userStoreService.setToken(null);
    }

    public addTask(): void {
        const dialogRef = this.addTaskService.openAddTask();

        dialogRef.afterClosed()
            .pipe(
                filter(data => !!data),
                switchMap(data => this.taskGrpcService.addTask(data)),
            )
            .subscribe(
                data => this.logger.debug(data),
                err => this.logger.error(err),
            );
    }
}
