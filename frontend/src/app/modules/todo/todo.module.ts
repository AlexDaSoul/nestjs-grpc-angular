import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareModule } from '@share/share.module';
import { GrpcModule } from '@grpc/grpc.module';
import { RoutingModule } from './todo.routes';

import { TodoComponent } from './todo.component';
import { TasksComponent } from './tasks/tasks.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { UpdateTaskComponent } from './update-task/update-task.component';
import { StatusSettingsComponent } from './board/status-settings/status-settings.component';
import { BoardComponent } from './board/board.component';
import { MembersSettingsComponent } from './board/members-settings/members-settings.component';

@NgModule({
    declarations: [TodoComponent, TasksComponent, AddTaskComponent, UpdateTaskComponent, StatusSettingsComponent, BoardComponent, MembersSettingsComponent],
    imports: [
        CommonModule,
        ShareModule,
        GrpcModule,
        RoutingModule,
    ],
    exports: [
        AddTaskComponent,
    ],
})
export class TodoModule {
}
