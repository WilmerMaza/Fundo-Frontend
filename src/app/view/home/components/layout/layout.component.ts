import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [MatCardModule, RouterModule],
  template: `
  <section class="content-card">
  <mat-card appearance="outlined" class="mat-card">
      <mat-card-content class="card">
          <router-outlet></router-outlet>
      </mat-card-content>
  </mat-card>
</section>`,
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
