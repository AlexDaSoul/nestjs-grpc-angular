import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodoComponent } from './todo.component';
import { BoardsComponent } from './boards/boards.component';
import { AuthGuard } from '@share/guards/auth.guard';
import { AuthChildGuard } from '@share/guards/auth-child.guard';
import { BoardComponent } from './boards/board/board.component';

const routes: Routes = [
    {
        path: '',
        component: TodoComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthChildGuard],
        children: [
            {
                path: 'dashboard',
                component: BoardsComponent,
            },
            {
                path: 'dashboard/:id',
                component: BoardsComponent,
                children: [{
                    path: '',
                    component: BoardComponent,
                }],
            },
        ],
    },
];

export const RoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
