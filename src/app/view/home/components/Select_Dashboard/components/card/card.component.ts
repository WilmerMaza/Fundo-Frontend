import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ButtonDashboard } from '../../interface/ButtonDashboard';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  dataDashboard = input.required<ButtonDashboard>();
}
