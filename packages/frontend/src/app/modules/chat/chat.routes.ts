import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatComponent } from './chat.component';
import { AuthGuard } from '@share/guards/auth.guard';

const routes: Routes = [
    {
        path: 'chat',
        component: ChatComponent,
        canActivate: [AuthGuard],
    },
];

export const RoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
