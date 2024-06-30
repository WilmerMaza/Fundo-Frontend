import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, signal } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { StepperComponent } from 'src/app/shared/stepper/stepper.component';
import { SteperDinamic } from 'src/app/utils/interface/SteperDinamic';
import { SteperLevantamiento } from 'src/app/view/home/constants/SteperLevantamiento';
import { requestSuccefull } from 'src/app/view/Timer_Platform/Interface/Datos-interfaces';
import Swal from 'sweetalert2';
import { Mobile, RequestHall } from '../../../../interfaces/requesHall';
import { LayoutComponent } from '../../../layout/layout.component';
import { FormModel } from '../../model/FormModel';
import { RegistroService } from '../../services/registro.service';

@Component({
  selector: 'app-levantamiento',
  standalone: true,
  providers: [
    provideNativeDateAdapter(),
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
  imports: [
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatCardModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutComponent,
    StepperComponent
  ],
  templateUrl: './levantamiento.component.html',
  styleUrl: './levantamiento.component.scss',
})
export class LevantamientoComponent {
  public step = signal(0);

  public stepperData: SteperDinamic[] = SteperLevantamiento;
  public formRegister: FormGroup = new FormModel().formRegistro();
  public formCronometro: FormGroup = new FormModel().formRegistro();
  public eventStep: string = ''
  private stepMovilData: Mobile[] = []

  constructor(private registroService$: RegistroService, private router$: Router) { }

  setStep(index: number): void {
    this.step.set(index);
  }

  nextStep(): void {
    this.step.update((i) => i + 1);
  }

  prevStep(): void {
    this.step.update((i) => i - 1);
  }

  steppExportData(data: Mobile[]): void {
    this.eventStep = ''
    this.stepMovilData = data
    this.createHall()

  }

  sentEventSteper(event: string): void {

    if (this.eventStep === 'submit'

    ) {

      if (
        this.formRegister.invalid ||
        this.formCronometro.invalid || this.stepMovilData.length <= 2
      ) {
        this.formRegister.markAllAsTouched()
        this.formCronometro.markAllAsTouched()

        Swal.fire({
          icon: 'error',
          title: "Oops...",
          text: `${'Validar Formulario'}`,
        });

        this.eventStep = ''
        return
      }
    }
    this.formRegister.markAllAsTouched()
    this.formCronometro.markAllAsTouched()
    this.eventStep = event

  }

  createHall(): void {

    if (
      this.formRegister.invalid ||
      this.formCronometro.invalid ||
      this.stepMovilData.length <= 2
    ) {
      this.formRegister.markAllAsTouched()
      this.formCronometro.markAllAsTouched()

      Swal.fire({
        icon: 'error',
        title: "Oops...",
        text: `${'Validar Formulario'}`,
      });
      return
    }

    const reques: RequestHall = {
      RegistrationPlatform: this.formRegister.value,
      mobile: this.stepMovilData,
      chronometer: this.formCronometro.value
    }


    this.registroService$.createHallLevantamiento(reques).subscribe(({ message }: requestSuccefull) => {

      const hall = message.split(':')[1]

      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success"
        },
        buttonsStyling: false
      });

      swalWithBootstrapButtons.fire({
        title: "Sala creada",
        html: `<p class="sweetalertText">
       ${hall} </p>
      `,

        icon: "success",
        confirmButtonText: "copiar",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          navigator.clipboard.writeText(hall).then(() => {
            swalWithBootstrapButtons.fire({
              title: "copiado!",
              text: "Texto copiado al portapapeles.",
              icon: "success"
            });
          }).catch(err => {
            console.error('Error al copiar el texto: ', err);
          });

          this.router$.navigate([`/board/link`], { queryParams: { hall } });
        }
      });

    })

  }
}
