import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CryptoService } from 'src/app/services/crypto.service';
import { Ierror } from 'src/app/utils/error';
import Swal from 'sweetalert2';
import { DefaulPlatform } from '../model/defaulPlatform';
import { LoginPlatformFormModel } from '../model/LoginFormModel';
import { SessionService } from '../services/session.service';
import {
  chronometer,
  chronometerList,
  dashboard,
  platform,
  platformSelectForm,
} from './../../../utils/const';
import { Validators } from './../../../utils/Validators';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup = new LoginPlatformFormModel().formLogin();
  private cryptoService$ = new CryptoService();
  public platformList: DefaulPlatform[] = platformSelectForm;
  private platform: string | undefined = '';
  private platformType: string | undefined = '';
  public platformSelect: boolean = true;
  public isplatformTypeSelect: boolean = true;
  private urlPlatform: string = '';
  public selected: string = '';
  public selectedTPlatform: string = '';

  constructor(
    private router$: Router,
    private sessionService$: SessionService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.queryParam();
  }

  queryParam(): void {
    this.route.queryParams.subscribe(({ Platform }: Params) => {
      const paramValid = Validators.isNullOrUndefined(Platform);
      this.platformSelect = paramValid;
      if (paramValid) return;

      this.urlPlatform = Platform;
      this.platform = platform?.find((item) => {
        return Platform.includes(item);
      });
      if (Validators.isNullOrUndefined(this.platform)) {
        this.platformSelect = true;
        return;
      }

      this.selected = this.platform;

      this.platformType = this.urlPlatform.slice(
        this.urlPlatform.lastIndexOf('/') + 1
      );

      this.isplatformTypeSelect = this.tPlatformSelect(this.platform, this.platformType);
    });
  }

  validPlatform(): void {

    const platformControl = this.loginForm.get('platform');
    const tPlatformControl = this.loginForm.get('tPlatform');
    const documentoControl = this.loginForm.get('documento');

    if (!this.platformSelect) {
      platformControl?.clearValidators();
      platformControl?.updateValueAndValidity();
    }

    if (!this.isplatformTypeSelect) {
      tPlatformControl?.clearValidators();
      tPlatformControl?.updateValueAndValidity();
    }

    if (tPlatformControl?.value === 'Public') {
      documentoControl?.clearValidators();
      documentoControl?.updateValueAndValidity();
    }
  }

  sessionLogin(): void {
    this.validPlatform();

    if (!this.loginForm.invalid) {
      const data = {
        ...this.loginForm.value,
        platform: this.platformSelect
          ? this.loginForm.get('platform')?.value
          : this.platform,
        tPlatform: this.isplatformTypeSelect ? this.loginForm.get('tPlatform')?.value : this.platformType
      };

      const { tPlatform, ...dataRequest } = data;
      // NormaliceLowerValidators.normaliceData(data)

      // data.Password = this.cryptoService$
      //   .Encript(this.loginForm.get('password')?.value)
      //   .toString();
      this.urlPlatform = `${dataRequest.platform}/${tPlatform}`;

      if (tPlatform === 'Public') {
        this.router$.navigate([`${this.urlPlatform}`]);
      } else {
        this.sessionService$.sessionLogin(dataRequest).subscribe(
          () => {
            this.router$.navigate([`${this.urlPlatform}`]);
          },
          (loginError: Ierror) => {
            Swal.fire({
              icon: 'error',
              title: "Oops...",
              text: `${loginError.statusText}  `,
            });
          }
        );
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  isSelectPlatform = (): boolean =>
    this.selected === chronometer ||
    this.selected === dashboard

  tPlatformSelectForm(params: string): DefaulPlatform[] {
    const platformMapping: { [key: string]: DefaulPlatform[] } = {
      'chronometer': chronometerList,
      // Agrega otras plataformas aquí según sea necesario
    };

    return platformMapping[params] || [];
  }


  tPlatformSelect(params: string, type: string): boolean {
    const platformLogic: { [key: string]: () => boolean } = {
      'chronometer': () => !chronometerList.some((item: DefaulPlatform) => type.includes(item.value)),
      'mobile': () => false,
      'Registration_Platform': () => false,
    };

    return platformLogic[params] ? platformLogic[params]() : true;
  }

  selectPlatform(select: string): void {
    const platformActions: { [key: string]: () => void } = {
      'mobile': () => { this.isplatformTypeSelect = false; },
      'Registration_Platform': () => { this.isplatformTypeSelect = false; },
      // Agrega otras plataformas aquí según sea necesario
    };

    if (platformActions[select]) {
      platformActions[select]();
    }
  }


  clearForm(): void {
    this.loginForm.reset()
  }
}
