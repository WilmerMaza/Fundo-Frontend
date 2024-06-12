import { Routes } from '@angular/router';
import { jwtGuard } from './cord/guard/jwt.guard';


export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./view/home/home.component').then((c) => c.HomeComponent)
    },
    {
        path: 'Dashboard',
        loadComponent: () =>
            import('./view/Dashboard_Platform/dashboard.component').then((c) => c.DashboardComponent)
    },
    {
        path: 'mobile',
        loadComponent: () =>
            import('./view/Movil_Platform/movil.component').then(
                (c) => c.MovilComponent
            ),
    },
    {
        path: 'Registration_Platform',
        loadComponent: () =>
            import('./view/Registration_Platform/registration-platform.component').then(
                (c) => c.RegistrationPlatformComponent
            ),
    },
    {
        path: 'chronometer',
        canActivate:[jwtGuard],
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
    // {
    //     path: 'Cronometro/Arbitrator',
    //     loadComponent: () =>
    //         import('./view/Timer_Platform/Timer-Arbitrator/timer_Arbitrator.component').then(
    //             (c) => c.TimerArbitroComponent
    //         ),
    // },
];