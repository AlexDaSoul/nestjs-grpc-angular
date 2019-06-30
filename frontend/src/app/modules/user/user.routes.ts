import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './register/register.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
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
    },
];

export const RoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
