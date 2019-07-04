import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { Observable, ReplaySubject, interval, Subject, of } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { AuthGrpcService } from '@grpc/services/user/auth.service';
import { AuthRes } from '@grpc/proto/user/auth_pb';

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

    public updateAuth(): Observable<AuthRes.AsObject> {
        if (this.getToken()) {
            return this.authGrpcService.updateAuth()
                .pipe(tap(res => this.loggedIn(res.token)));
        } else {
            this.logout();
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
