import 'hammerjs';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
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
    MatDialogModule,
    MatTabsModule,
    MatChipsModule,
    MatAutocompleteModule,
} from '@angular/material';


import { LoggerModule } from 'ngx-logger';

import { environment } from '@environments/environment';
import { GrpcModule } from '@grpc/grpc.module';
import { EditStatusComponent } from './components/popups/edit-status/edit-status.component';
import { AddStatusComponent } from './components/popups/add-status/add-status.component';
import { ConfirmComponent } from './components/popups/confirm/confirm.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
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
        MatDialogModule,
        DragDropModule,
        MatTabsModule,
        MatChipsModule,
        MatAutocompleteModule,
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
        MatDialogModule,
        DragDropModule,
        MatTabsModule,
        MatChipsModule,
        MatAutocompleteModule,
        EditStatusComponent,
    ],
    declarations: [
        EditStatusComponent,
        AddStatusComponent,
        ConfirmComponent,
    ],
    entryComponents: [
        EditStatusComponent,
        AddStatusComponent,
        ConfirmComponent
    ],
})
export class ShareModule {
}
