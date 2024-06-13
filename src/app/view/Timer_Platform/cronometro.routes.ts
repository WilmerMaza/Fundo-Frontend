import { Routes } from '@angular/router';
import { ignoreJwtGuard } from 'src/app/cord/guard/ignore-jwt.guard';
import { platformGuard } from 'src/app/cord/guard/platform.guard';


export const routes: Routes = [
    {
        path: 'Public',
        canActivate: [ignoreJwtGuard],
        loadComponent: () =>
            import('./Timer-Public/timer_Public.component').then(
                (c) => c.TimerComponent
            ),
    },

    {
        path: 'Arbitrator',
        canActivate: [platformGuard],
        loadComponent: () =>
            import('./Timer-Arbitrator/timer_Arbitrator.component').then(
                (c) => c.TimerArbitroComponent
            ),
    },
];