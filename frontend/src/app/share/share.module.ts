import 'hammerjs';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import {
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
} from '@angular/material';

import { LoggerModule } from 'ngx-logger';

import { environment } from '@environments/environment';
import { GrpcModule } from '@grpc/grpc.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        MatSidenavModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        LoggerModule.forRoot(environment.logger),
        GrpcModule,
    ],
    exports: [
        MatSidenavModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        HttpClientModule,
    ],
})
export class ShareModule {
}
