import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { KEYSESSION } from '../models/constan';
import { Ijwt, session } from '../models/dataUserModel';
import { Validators } from '../utils/Validators';
import { Persistence } from './persistence.service';

@Injectable({
  providedIn: 'root',
})

export class AuthService extends ComponentStore<session> {

  private jwt: string = '';

  constructor(private persistence$: Persistence) {
    super({} as session);

    const isAuth = persistence$.get(KEYSESSION);

    if (isAuth) {
      this.setAuth(isAuth);
    }

    this.getToken.subscribe((res) => {
      this.jwt = res;
    });
  }

  isAuthenticated(): boolean {
    const token = this.jwt;

    if (token) {
      try {
        // Decodificar el token
        const { exp }: Ijwt = jwtDecode(token);

        // Obtener la fecha de expiración del token en segundos
        const expirationDateInSeconds = exp;

        // Obtener la fecha actual en segundos
        const currentDateInSeconds = Math.floor(Date.now() / 1000);

        // Verificar si el token ha expirado
        if (expirationDateInSeconds < currentDateInSeconds) {
          this.persistence$.delete(KEYSESSION);
          return false;
        } else {
          return true;
        }
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        return false;
      }
    } else {
      return false;
    }
  }

  readonly setAuth = this.updater((state, payload: session) => {
    this.persistence$.save(KEYSESSION, payload);
    return {
      ...state,
      token: payload.token,
    };
  });

  readonly getToken: Observable<string> = this.select((state: session) => state.token);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly getDataUser: Observable<any> = this.select((state: session) => {
    return Validators.isNullOrUndefined(state.token) ? false : jwtDecode(state.token);
  });
}


