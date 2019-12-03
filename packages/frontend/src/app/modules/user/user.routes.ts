import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@share/guards/auth.guard';

import { UserComponent } from './user.component';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './register/register.component';
import { SettingsComponent } from './settings/settings.component';

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
