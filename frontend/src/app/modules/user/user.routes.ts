import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthChildGuard } from '@share/guards/auth-child.guard';
import { UserComponent } from './user.component';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './register/register.component';
import { SettingsComponent } from './settings/settings.component';
import { AuthGuard } from '@share/guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: UserComponent,
        children: [
            {
                path: 'auth',
                component: AuthComponent,
            },
            {
                path: 'register',
                component: RegisterComponent,
            },
            {
                path: 'settings',
                component: SettingsComponent,
                canActivate: [AuthGuard],
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'auth',
            },
        ],
    },
];

export const RoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
