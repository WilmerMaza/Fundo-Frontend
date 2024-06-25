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

  formMobileUno(): FormGroup {
    return new FormGroup({
      name: new FormControl(null, Validators.required),
      document: new FormControl(null, [Validators.required]),
    })
  }

  formMobileDos(): FormGroup {
    return new FormGroup({
      name: new FormControl(null, Validators.required),
      documento: new FormControl(null, [Validators.required]),
    })
  }

  formMobileTres(): FormGroup {
    return new FormGroup({
      name: new FormControl(null, Validators.required),
      documento: new FormControl(null, [Validators.required]),
    })
  }
}
