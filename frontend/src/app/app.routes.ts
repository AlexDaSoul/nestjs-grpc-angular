import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'chat',
    },
];

export const RoutingModule: ModuleWithProviders = RouterModule.forRoot(routes);
