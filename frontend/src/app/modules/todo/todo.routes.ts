import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodoComponent } from './todo.component';
import { TasksComponent } from './tasks/tasks.component';
import { AuthGuard } from '@share/guards/auth.guard';

const routes: Routes = [
    {
        path: 'dashboard',
        component: TodoComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: '',
                component: TasksComponent,
            },
        ],
    },
];

export const RoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
