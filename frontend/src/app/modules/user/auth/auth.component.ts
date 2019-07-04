import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NGXLogger } from 'ngx-logger';

import { AuthGrpcService } from '@grpc/services/user/auth.service';
import { AuthService } from '@share/services/auth.service';
import { UserStoreService } from '@share/services/user-store.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {

    public form: FormGroup = this.fb.group({
        email: ['me@mail.com', [Validators.required, Validators.email]],
        password: [1234, [Validators.required, Validators.minLength(4)]],
    });

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private snackBar: MatSnackBar,
        private logger: NGXLogger,
        private authGrpcService: AuthGrpcService,
        private authService: AuthService,
        private userStoreService: UserStoreService,
    ) {
    }

    ngOnInit() {
    }

    public onSubmit(): void {
        if (this.form.valid) {
            this.authGrpcService.auth(this.form.value)
                .subscribe(
                    res => {
                        this.userStoreService.setUser(res.user);
                        this.authService.loggedIn(res.token);
                        this.form.reset();
                        this.router.navigateByUrl('/dashboard');
                    },
                    err => {
                        const message = err.code === 13 ? 'User not found' : err.message;

                        this.snackBar.open(message, 'close', {
                            duration: 5000,
                            horizontalPosition: 'right',
                            verticalPosition: 'top',
                            panelClass: 'error-message',
                        });
                    });
        }
    }
}
