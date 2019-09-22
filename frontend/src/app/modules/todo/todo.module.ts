import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareModule } from '@share/share.module';
import { GrpcModule } from '@grpc/grpc.module';
import { RoutingModule } from './todo.routes';

import { TodoComponent } from './todo.component';
import { BoardsComponent } from './boards/boards.component';
import { UpdateTaskComponent } from './update-task/update-task.component';
import { StatusComponent } from './boards/status/status.component';
import { TaskComponent } from './boards/task/task.component';
import { BoardComponent } from './boards/board/board.component';

@NgModule({
    declarations: [
        TodoComponent,
        BoardsComponent,
        UpdateTaskComponent,
        StatusComponent,
        TaskComponent,
        BoardComponent,
    ],
    imports: [
        CommonModule,
        RoutingModule,
        ShareModule,
        GrpcModule,
    ],
})
export class TodoModule {
}
