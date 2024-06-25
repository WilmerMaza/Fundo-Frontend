import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { concatMap } from 'rxjs';
import { Ijwt } from 'src/app/models/dataUserModel';
import { AuthService } from 'src/app/services/auth-service.service';
import { Validators } from 'src/app/utils/Validators';
import { environment } from 'src/environments/environment';
import { Athlete, DataDeportista } from '../Timer_Platform/Interface/Datos-interfaces';
import { MovilService } from './services/movil.service';

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
        <p class="Athlete-name">{{validInformation(dataAthlete.LastName) +' '+ validInformation(dataAthlete.Name) }}</p>
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
export class MovilComponent implements OnInit {
  selectedButton: string | null = null;
  private hall: string = '';
  private urlSSEBoard: string = `${environment.gatewayUrlFundo}cronometro/Register/`;
  public dataAthlete: Athlete = {} as Athlete;
  constructor(private movilService$: MovilService, private authService$: AuthService) { }

  ngOnInit(): void {
    this.concatMapInfomation();
  }

  concatMapInfomation(): void {
    this.authService$.getDataUser.pipe(
      concatMap(({ hall }: Ijwt) => {
        this.hall = hall;
        this.movilService$.setupSSE(`${this.urlSSEBoard}${hall}`);
        return this.movilService$.notificaciones$;
      })
    ).subscribe({
      next: ({ body }: DataDeportista) => {
        this.dataAthlete = body;
      },
      error: error => {
        console.error('Error:', error);
      }
    });
  }

  validInformation = (value: string): string => Validators.isNullOrUndefined(value) ? '' : value



  selectButton(button: string): void {
    this.selectedButton = button;
  }
}
