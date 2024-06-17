import { Routes } from '@angular/router';
import { ignoreJwtGuard } from 'src/app/cord/guard/ignore-jwt.guard';
import { platformGuard } from 'src/app/cord/guard/platform.guard';


export const routes: Routes = [
    {
        path: 'Public',
        canActivate: [ignoreJwtGuard],
        loadComponent: () =>
            import('./Timer-Arbitrator/timer_Arbitrator.component').then(
                (c) => c.TimerArbitroComponent
            ),
        data: {
            Public: true
        }
    },

    {
        path: 'Arbitrator',
        canActivate: [platformGuard],

        loadComponent: () =>
            import('./Timer-Arbitrator/timer_Arbitrator.component').then(
                (c) => c.TimerArbitroComponent
            ),
        data: {
            Public: false
        }
    },
];