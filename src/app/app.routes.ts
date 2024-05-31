import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./view/home/home.component').then((c) => c.HomeComponent)
    },
    {
        path: 'Dashboard',
        loadComponent: () =>
            import('./view/Dashboard/dashboard.component').then((c) => c.DashboardComponent)
    },
    {
        path: 'Movil',
        loadComponent: () =>
            import('./view/Movil/movil.component').then(
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
        path: 'Timer',
        loadComponent: () =>
            import('./view/TimerComponen/Timer/timer.component').then(
                (c) => c.TimerComponent
            ),
    },

    {
        path: 'TimerPublic',
        loadComponent: () =>
            import('./view/TimerComponen/timer2/timer2.component').then(
                (c) => c.Timer2Component
            ),
    },
];