import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { NGXLogger } from 'ngx-logger';

import { getUserIdFromJWT } from '@grpc/helpers/grpc-get-id';
import { User } from '@grpc/proto/user/user.types_pb';
import { UserGrpcService } from '@grpc/services/user/user.service';
import { AuthService } from '@share/services/auth.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent implements OnInit {

    private user: User.AsObject;

    public form: FormGroup = this.fb.group({
        name: [null, [Validators.required]],
        email: [null, [Validators.required, Validators.email]],
        avatar: [null],
    });

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private snackBar: MatSnackBar,
        private logger: NGXLogger,
        private userGrpcService: UserGrpcService,
        private authService: AuthService,
    ) {
        const token = this.authService.getToken();
        const id = getUserIdFromJWT(token);

        this.userGrpcService.getUser({ id })
            .subscribe(user => {
                this.user = user;
                this.form.get('name').setValue(user.name);
                this.form.get('email').setValue(user.email);
                this.form.get('avatar').setValue(user.avatar);
            });
    }

    ngOnInit() {
    }

    private updateUser(): void {

    }

    public onSubmit(): void {
        if (this.form.valid) {
            this.userGrpcService.updateUser(this.form.value)
                .subscribe(
                    res => {
                        this.updateUser();
                        this.logger.debug(res);
                    },
                    err => {
                        this.snackBar.open(err.message, 'close', {
                            duration: 5000,
                            horizontalPosition: 'right',
                            verticalPosition: 'top',
                            panelClass: 'error-message',
                        });
                    });
        }
    }
}
