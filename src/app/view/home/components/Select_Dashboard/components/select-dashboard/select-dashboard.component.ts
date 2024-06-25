import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { ButtonDashboard } from '../../interface/ButtonDashboard';
import { CardComponent } from '../card/card.component';


@Component({
  selector: 'app-select-dashboard',
  standalone: true,
  imports: [MatCardModule, CardComponent],
  templateUrl: './select-dashboard.component.html',
  styleUrl: './select-dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectDashboardComponent {

 private router$ = inject(Router);

  public dashboards: ButtonDashboard[] = [{
    title: 'Levantamiento de Pesas',
    img: '../../../../../../assets/img/homem-forte-levantamento-pesos.webp',
    board: 'Levantamiento'

  }]

  createHall(board: string): void {
    this.router$.navigate([`board/${board}`]);
  }

}
