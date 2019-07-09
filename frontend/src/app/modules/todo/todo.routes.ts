import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodoComponent } from './todo.component';
import { TasksComponent } from './tasks/tasks.component';
import { StatusSettingsComponent } from './status-settings/status-settings.component';
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
    {
        path: 'status-settings',
        component: StatusSettingsComponent,
        canActivate: [AuthGuard],
    },
];

export const RoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
