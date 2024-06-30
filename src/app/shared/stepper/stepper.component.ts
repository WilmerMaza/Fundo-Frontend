import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, effect, input, OnInit, output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { Controle, SteperDinamic } from 'src/app/utils/interface/SteperDinamic';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule, MatDatepickerModule, MatSelectModule,
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    }, provideNativeDateAdapter()
  ],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss',
})
export class StepperComponent implements OnInit {
  public stepValue = input.required<SteperDinamic[]>();
  public actionStepper = input<string>();
  public stepsExportValue = output<any>();
  public formDinamic!: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
    effect(() => {
      console.log(this.actionStepper());
      if (this.actionStepper()) {
        this.validAction(this.actionStepper()!)
      }
    });
  }

  ngOnInit(): void {

    this.formDinamic = this._formBuilder.group({
      steps: this._formBuilder.array([]),
    });
    this.initializeForm()
  }


  initializeForm(): void {

    this.stepValue().forEach((stepValue: SteperDinamic) => {
      const stepGroup = this._formBuilder.group({});
      if (!stepValue.controle) return

      stepValue.controle.forEach((control: Controle) => {
        stepGroup.addControl(
          control.controlName,
          this._formBuilder.control<string>('', { validators: control.validators, nonNullable: true, })
        );
      });
      this.steps.push(stepGroup);
    });
  }

  get steps(): FormArray {
    return this.formDinamic.get('steps') as FormArray;
  }
  getStepFormGroup(index: number): FormGroup {
    return this.steps.at(index) as FormGroup;
  }

  validAction(action: string): void {

    switch (action) {
      case 'submit':
        this.validFormAction()
        break;

      default:
        break;
    }


  }

  validFormAction(): void {

    if (this.steps.invalid) {
      this.steps.markAllAsTouched()

      Swal.fire({
        icon: 'error',
        title: "Oops...",
        text: `${'Validar Formulario'}`,
      });
      return
    }
    this.stepsExportValue.emit(this.steps.value)

  }
}
