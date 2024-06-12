import { Routes } from '@angular/router';


export const routes: Routes = [
    {
        path: 'Public',
        loadComponent: () =>
            import('./Timer-Public/timer_Public.component').then(
                (c) => c.TimerComponent
            ),
    },

    {
        path: 'Arbitrator',
        loadComponent: () =>
            import('./Timer-Arbitrator/timer_Arbitrator.component').then(
                (c) => c.TimerArbitroComponent
            ),
    },
];