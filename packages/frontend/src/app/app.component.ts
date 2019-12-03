import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { Observable } from 'rxjs';

import { jwtAuthError$ } from '@grpc/helpers/grpc-jwt';
import { AuthService } from '@share/services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

    public isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn();

    constructor(
        private logger: NGXLogger,
        private authService: AuthService,
    ) {
    }

    ngOnInit() {
        const updateAuth = this.authService.updateAuth();

        if (updateAuth instanceof Observable) {
            updateAuth
                .subscribe(
                    res => this.authService.loggedIn(res.token),
                    err => {
                        this.authService.logout();
                        this.logger.error(err);
                    },
                );
        }

        jwtAuthError$.asObservable()
            .subscribe(() => {
                this.logout();
                this.logger.warn('JWT is not valid');
            });
    }

    public logout(): void {
        this.authService.logout();
    }
}
