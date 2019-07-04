import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodoComponent } from './todo.component';
import { TasksComponent } from './tasks/tasks.component';
import { AuthGuard } from '@share/guards/auth.guard';
import { AuthChildGuard } from '@share/guards/auth-child.guard';

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
];

export const RoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
