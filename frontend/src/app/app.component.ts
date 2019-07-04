import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NGXLogger } from 'ngx-logger';

import { jwtAuthError$ } from '@grpc/helpers/grpc-jwt';
import { AuthService } from '@share/services/auth.service';
import { UserStoreService } from '@share/services/user-store.service';
import { User } from '@grpc/proto/user/user.types_pb';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

    public isLoggedIn$ = this.authService.isLoggedIn();
    public user$: Observable<User.AsObject> = this.userStoreService.getUser();

    constructor(
        private logger: NGXLogger,
        private authService: AuthService,
        private userStoreService: UserStoreService,
    ) {
    }

    ngOnInit() {
        const updateAuth = this.authService.updateAuth();

        if (updateAuth instanceof Observable) {
            updateAuth
                .subscribe(
                    res => this.userStoreService.setUser(res.user),
                    err => {
                        this.authService.logout();
                        this.userStoreService.setUser(null);
                        this.logger.error(err);
                    },
                );
        }

        jwtAuthError$.asObservable()
            .subscribe(() => {
                this.authService.logout();
                this.logger.warn('JWT is not valid');
            });
    }

    public logout(): void {
        this.authService.logout();
        this.userStoreService.setUser(null);
    }

    public addTask(): void {
    }
}
