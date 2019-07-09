import 'hammerjs';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatMenuModule,
    MatDividerModule,
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
        MatSnackBarModule,
        MatToolbarModule,
        MatMenuModule,
        MatDividerModule,
        DragDropModule,
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
        MatSnackBarModule,
        MatToolbarModule,
        MatMenuModule,
        MatDividerModule,
        DragDropModule,
    ],
})
export class ShareModule {
}
