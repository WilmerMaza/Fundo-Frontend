import { FormControl, FormGroup, Validators } from "@angular/forms";

export class FormModel {

  formRegistro(): FormGroup {
    return new FormGroup({
      name: new FormControl(null, Validators.required),
      document: new FormControl(null, [Validators.required]),
    })
  }

  formCronometro(): FormGroup {
    return new FormGroup({
      name: new FormControl(null, Validators.required),
      document: new FormControl(null, [Validators.required]),
    })
  }
}
