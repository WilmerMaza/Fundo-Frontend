import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { concatMap } from 'rxjs';
import { Ijwt } from 'src/app/models/dataUserModel';
import { AuthService } from 'src/app/services/auth-service.service';
import { Toast } from 'src/app/utils/alert_Toast';
import { StepperComponent } from '../../../../shared/stepper/stepper.component';
import { SteperDinamic } from '../../../../utils/interface/SteperDinamic';
import { SteperDeportistas } from '../../constants/SteperDeportistas';
import { Deportista } from '../../interface/Deportista';
import { ResponseDeportista } from '../../interface/responseDeportista';
import { RegisterService } from '../../services/register.service';
@Component({
  selector: 'app-registration-platform',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule, MatIconModule, CommonModule, StepperComponent
  ], providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './registration-platform.component.html',
  styleUrl: './registration-platform.component.scss'
})
export class RegistrationPlatformComponent {

  public dataSteper: SteperDinamic[] = SteperDeportistas;
  public open: boolean = false

  constructor(private authService$: AuthService, private registerService$: RegisterService) { }

  openRegister(): void {
    this.open = !this.open
  }

  registerDeportista = (data: Deportista[]): void => this.concatMapInfomation(data)


  mergeObjectsInArray(arr: Deportista[]): any {
    return arr.reduce((acc, obj) => {
      return { ...acc, ...obj };
    }, {});

  }

  concatMapInfomation(data: Deportista[]): void {
    this.authService$.getDataUser.pipe(
      concatMap(({ hall }: Ijwt) => {
        const requestAthlete = { ...this.mergeObjectsInArray(data), Id_Partida: hall }
        return this.registerService$.registerAthleta(requestAthlete);
      })
    ).subscribe({
      next: (response: ResponseDeportista) => {
        Toast.fire({
          icon: 'success',
          title: response.message
        })
      },
      error: error => {
        console.error('Error:', error);
      }
    });
  }
}
