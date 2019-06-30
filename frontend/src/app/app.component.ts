import { Component } from '@angular/core';

import { AuthService } from '@share/services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {

    public isLoggedIn$ = this.authService.isLoggedIn();

    constructor(
        private authService: AuthService,
    ) {
    }

    public logout(): void {
        this.authService.logout();
    }
}
