import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-movil',
  standalone: true,
  imports: [CommonModule],
  template: ` <section class="content-movil">
    <div class="movil">
      <div class="Athlete-info">
        <div class="content-Title">
          <h2 class="Athlete-title">Evaluado</h2>
          <div class="select">
            @if (selectedButton === 'button1') {
            <span class="material-symbols-outlined check_circle" > check_circle </span>}
            @if (selectedButton === 'button2') {
              <span class="material-symbols-outlined cancel" > cancel </span>}
          </div>
         
        </div>
        <p class="Athlete-name">Meza Gomez Alberto jose</p>
      </div>

    

      <button
        class="Button Correct"
        [ngClass]="{ pressed: selectedButton === 'button1' }"
        (click)="selectButton('button1')"
      >
        <span class="material-symbols-outlined check"> check </span>
      </button>
      <button
        class="Button Incorrect"
        [ngClass]="{ pressed: selectedButton === 'button2' }"
        (click)="selectButton('button2')"
      >
        <span class="material-symbols-outlined close"> close </span>
      </button>
    </div>
  </section>`,
  styleUrl: './movil.component.scss',
})
export class MovilComponent {
  selectedButton: string | null = null;
  selectButton(button: string): void {
    this.selectedButton = button;
  }
}
