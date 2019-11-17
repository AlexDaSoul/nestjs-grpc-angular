import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NGXLogger } from 'ngx-logger';
import { switchMap } from 'rxjs/operators';

import { AuthGrpcService } from '@grpc/services/user/auth.service';
import { UserGrpcService } from '@grpc/services/user/user.service';
import { AuthService } from '@share/services/auth.service';
import { UserStoreService } from '@share/services/user-store.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

    public form: FormGroup = this.fb.group({
        name: [null, [Validators.required]],
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(4)]],
    });

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private snackBar: MatSnackBar,
        private logger: NGXLogger,
        private userGrpcService: UserGrpcService,
        private authGrpcService: AuthGrpcService,
        private authService: AuthService,
        private userStoreService: UserStoreService,
    ) {
    }

    ngOnInit() {
    }

    public onSubmit(): void {
        if (this.form.valid) {
            this.userGrpcService.createUser(this.form.value)
                .pipe(
                    switchMap(() => this.authGrpcService.auth(this.form.value)))
                .subscribe(
                    res => {
                        this.authService.loggedIn(res.token);
                        this.form.reset();
                        this.router.navigateByUrl('/dashboard');
                    },
                    err => {
                        const message = err.code === 23505 ? 'User already exist' : err.message;

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
