import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { GrpcModule } from '@grpc/grpc.module';
import { ShareModule } from '@share/share.module';
import { RoutingModule } from './user.routes';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
    declarations: [AuthComponent, RegisterComponent, UserComponent, SettingsComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        GrpcModule,
        ShareModule,
        RoutingModule,
    ],
})
export class UserModule {
}
