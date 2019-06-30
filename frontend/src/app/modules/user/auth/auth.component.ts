import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';

import { AuthGrpcService } from '@grpc/services/user/auth.service';
import { AuthService } from '@share/services/auth.service';

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
                        this.router.navigateByUrl('/dashboard');
                    },
                    err => this.logger.error(err),
                );
        }
    }
}
