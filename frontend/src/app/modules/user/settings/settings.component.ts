import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { switchMap } from 'rxjs/operators';

import { AuthGrpcService } from '@grpc/services/user/auth.service';
import { AuthService } from '@share/services/auth.service';
import { UserGrpcService } from '@grpc/services/user/user.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

    public form: FormGroup = this.fb.group({
        name: [null, [Validators.required]],
        email: [null, [Validators.required, Validators.email]],
    });

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private logger: NGXLogger,
        private userGrpcService: UserGrpcService,
        private authService: AuthService,
    ) {
        const token = this.authService.getToken().split('.')[1];
        const jwt = JSON.parse(atob(token));

        this.userGrpcService.getUser(jwt.id)
            .subscribe(user => {
                this.form.get('name').setValue(user.name);
                this.form.get('email').setValue(user.email);
            });
    }

    ngOnInit() {
    }

    public onSubmit(): void {
        if (this.form.valid) {
            this.userGrpcService.updateUser(this.form.value)
                .subscribe(
                    res => {
                        this.logger.log(res);
                    },
                    err => this.logger.error(err),
                );
        }
    }
}
