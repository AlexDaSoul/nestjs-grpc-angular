import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodoComponent } from './todo.component';
import { TasksComponent } from './tasks/tasks.component';
import { AuthGuard } from '@share/guards/auth.guard';
import { AuthChildGuard } from '@share/guards/auth-child.guard';
import { BoardComponent } from './board/board.component';

const routes: Routes = [
    {
        path: 'dashboard',
        component: TodoComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthChildGuard],
        children: [
            {
                path: '',
                component: TasksComponent,
            },
        ],
    },
    {
        path: 'board-settings',
        component: BoardComponent,
        canActivate: [AuthGuard],
    },
];

export const RoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
