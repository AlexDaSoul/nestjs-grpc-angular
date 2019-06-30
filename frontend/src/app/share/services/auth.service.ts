import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { Observable, ReplaySubject, interval, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { AuthGrpcService } from '@grpc/services/user/auth.service';
import { jwtAuthError$ } from '@grpc/helpers/grpc-jwt';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    private ngOnDestroy$ = new Subject<void>();
    private loggedInSubject$ = new ReplaySubject<boolean>(1);

    constructor(
        private router: Router,
        private logger: NGXLogger,
        private authGrpcService: AuthGrpcService,
    ) {
        this.updateAuth();

        jwtAuthError$.asObservable()
            .pipe(takeUntil(this.ngOnDestroy$))
            .subscribe(() => {
                this.logout();
                this.logger.warn('JWT is not valid');
            });
    }

    public updateToken(): void {
        const getToken = this.getToken().split('.')[1];
        const jwt = JSON.parse(atob(getToken));
        const now = Date.now() / 1000;
        const period = Math.ceil(jwt.exp - now - environment.authDiff) * 1000;

        interval(period)
            .pipe(
                switchMap(() => this.authGrpcService.updateAuth()),
                takeUntil(this.ngOnDestroy$),
            )
            .subscribe(
                res => localStorage.setItem(environment.token, res.token),
                err => this.logger.warn(err.message));
    }

    private updateAuth(): void {
        if (this.getToken()) {
            this.authGrpcService.updateAuth()
                .subscribe(
                    res => this.loggedIn(res.token),
                    err => this.logger.warn(err.message));
        } else {
            this.loggedInSubject$.next(false);
        }
    }

    public isLoggedIn(): Observable<boolean> {
        return this.loggedInSubject$.asObservable();
    }

    public loggedIn(token: string): void {
        localStorage.setItem(environment.token, token);
        this.loggedInSubject$.next(true);
        this.updateToken();
    }

    public getToken(): string {
        return localStorage.getItem(environment.token);
    }

    public logout(): void {
        localStorage.removeItem(environment.token);
        this.loggedInSubject$.next(false);
        this.ngOnDestroy$.next();
        this.router.navigateByUrl('/auth');
    }
}
