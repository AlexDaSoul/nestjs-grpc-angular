import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '@share/services/auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthChildGuard implements CanActivateChild {

    constructor(
        private router: Router,
        private authService: AuthService,
    ) {
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.authService.isLoggedIn().pipe(
            map((isLoggedIn: boolean) => {
                if (isLoggedIn) {
                    return true;
                }

                this.router.navigateByUrl('/auth');
                return false;
            }),
        );
    }
}
