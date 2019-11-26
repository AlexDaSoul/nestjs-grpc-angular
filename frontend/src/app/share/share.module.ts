import 'hammerjs';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ScrollingModule } from '@angular/cdk/scrolling';

import {
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatToolbarModule,
} from '@angular/material';

import { LoggerModule } from 'ngx-logger';

import { environment } from '@environments/environment';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule,
        MatToolbarModule,
        ScrollingModule,
        LoggerModule.forRoot(environment.logger),
    ],
    exports: [
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        HttpClientModule,
        MatSnackBarModule,
        MatToolbarModule,
        ScrollingModule,
    ],
})
export class ShareModule {
}
