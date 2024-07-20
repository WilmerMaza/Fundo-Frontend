import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { concatMap } from 'rxjs';
import { Ijwt } from 'src/app/models/dataUserModel';
import { AuthService } from 'src/app/services/auth-service.service';
import { Toast } from 'src/app/utils/alert_Toast';
import { Validators } from 'src/app/utils/Validators';
import { environment } from 'src/environments/environment';
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
            @if (selectedButton === 'successful') {
            <span class="material-symbols-outlined check_circle">
              check_circle </span
            >} @if (selectedButton === 'failure') {
            <span class="material-symbols-outlined cancel"> cancel </span>}
          </div>
        </div>
        <p class="Athlete-name">
          {{
            validInformation(dataAthlete.LastName) +
              ' ' +
              validInformation(dataAthlete.Name)
          }}
        </p>
      </div>

      <button
        class="Button Correct"
        [ngClass]="{ pressed: selectedButton === 'successful' }"
        (click)="selectButton('successful')"
      >
        <span class="material-symbols-outlined check"> check </span>
      </button>
      <button
        class="Button Incorrect"
        [ngClass]="{ pressed: selectedButton === 'failure' }"
        (click)="selectButton('failure')"
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
  public dataAthlete: any = [];
  constructor(
    private movilService$: MovilService,
    private authService$: AuthService
  ) { }

  ngOnInit(): void {
    this.concatMapInfomation();
  }

  concatMapInfomation(): void {
    this.authService$.getDataUser
      .pipe(
        concatMap(({ hall }: Ijwt) => {
          this.hall = hall;
          this.movilService$.setupSSE(`${this.urlSSEBoard}${hall}`);
          return this.movilService$.notificaciones$;
        })
      )
      .subscribe({
        next: ({ body }: any) => {
          this.dataAthlete = body;
        },
        error: (error) => {
          console.error('Error:', error);
        },
      });
  }

  validInformation = (value: string): string =>
    Validators.isNullOrUndefined(value) ? '' : value;

  selectButton(button: string): void {
    this.selectedButton = button;

    const { Id, tipoCompeticion, evaluarNumber } = this.dataAthlete;

    const request = {
      deportista_id: Id,
      Id_Partida: this.hall,
      tipo: tipoCompeticion,
      intento: {
        peso: evaluarNumber,
        resultado: button === 'successful' ? 'Éxito' : 'Fallo',
      },
    };

    this.movilService$.postListCronometro(request).subscribe((res) => {
      Toast.fire({
        icon: 'success',
        title: 'Calificado'
      })
    });
  }
}
