import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TasksComponent } from './tasks/tasks.component';
import { AuthGuard } from '@share/guards/auth.guard';

const routes: Routes = [
    {
        path: 'dashboard',
        component: TasksComponent,
        canActivate: [AuthGuard],
    },
];

export const RoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
