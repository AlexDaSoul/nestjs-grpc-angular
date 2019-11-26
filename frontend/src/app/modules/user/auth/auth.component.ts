import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NGXLogger } from 'ngx-logger';

import { AuthGrpcService } from '@grpc/services/auth/auth.service';
import { AuthService } from '@share/services/auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent implements OnInit {

    public form: FormGroup = this.fb.group({
        email: ['johndoe@mail.com', [Validators.required, Validators.email]],
        password: ['demo', [Validators.required, Validators.minLength(4)]],
    });

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private snackBar: MatSnackBar,
        private logger: NGXLogger,
        private authGrpcService: AuthGrpcService,
        private authService: AuthService,
    ) {
    }

    ngOnInit() {
    }

    public onSubmit(): void {
        if (this.form.valid) {
            this.authGrpcService.auth(this.form.value)
                .subscribe(
                    res => {
                        this.authService.loggedIn(res.token);
                        this.form.reset();
                        this.router.navigateByUrl('/chat');
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
