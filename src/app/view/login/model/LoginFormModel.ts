import { FormControl, FormGroup, Validators } from "@angular/forms";

export class LoginPlatformFormModel {

  formLogin(): FormGroup {
    return new FormGroup({
      platform: new FormControl(null, Validators.required),
      tPlatform: new FormControl(null, Validators.required),
      hall: new FormControl(null, Validators.required),
      documento: new FormControl(null, [Validators.required]),
    })
  }
}
