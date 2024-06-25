import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';

export const board: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            './components/Select_Dashboard/components/select-dashboard/select-dashboard.component'
          ).then((c) => c.SelectDashboardComponent),
      },
      {
        path: 'Levantamiento',
        loadComponent: () =>
          import(
            './components/Create_Hall/components/levantamiento/levantamiento.component'
          ).then((c) => c.LevantamientoComponent),
      },
      {
        path: 'link',
        loadComponent: () =>
          import('./components/Link_Platform/link/link.component').then(
            (c) => c.LinkComponent
          ),
      },
    ],
  },
];
