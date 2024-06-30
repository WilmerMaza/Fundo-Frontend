import { Routes } from '@angular/router';
import { jwtGuard } from './cord/guard/jwt.guard';
import { platformGuard } from './cord/guard/platform.guard';


export const routes: Routes = [
    {
        path: '',
        redirectTo: 'board',
        pathMatch: 'full',
    },
    {
        path: 'board',
        loadChildren: () =>
            import('./view/home/board.routes').then((c) => c.board)
    },
    {
        path: 'Dashboard',
        loadComponent: () =>
            import('./view/Dashboard_Platform/dashboard.component').then((c) => c.DashboardComponent)
    },
    {
        path: 'mobile',
        canActivate: [jwtGuard, platformGuard],
        loadComponent: () =>
            import('./view/Movil_Platform/movil.component').then(
                (c) => c.MovilComponent
            ),
    },
    {
        path: 'RegistrationPlatform',
        canActivate: [jwtGuard, platformGuard],
        loadComponent: () =>
            import('./view/Registration_Platform/components/registration/registration-platform.component').then(
                (c) => c.RegistrationPlatformComponent
            ),
    },
    {
        path: 'chronometer',
        canActivate: [jwtGuard],
        loadChildren: () =>
            import('./view/Timer_Platform/cronometro.routes').then(
                (c) => c.routes
            ),
    },
    {
        path: 'login',
        loadComponent: () =>
            import('./view/login/login_Platform/login.component').then(
                (c) => c.LoginComponent
            ),
    },
];