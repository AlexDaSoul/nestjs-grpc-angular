import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GrpcModule } from '@grpc/grpc.module';
import { RoutingModule } from './todo.routes';

import { TodoComponent } from './todo.component';
import { TasksComponent } from './tasks/tasks.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { UpdateTaskComponent } from './update-task/update-task.component';

@NgModule({
    declarations: [TodoComponent, TasksComponent, AddTaskComponent, UpdateTaskComponent],
    imports: [
        CommonModule,
        GrpcModule,
        RoutingModule,
    ]
})
export class TodoModule {
}
