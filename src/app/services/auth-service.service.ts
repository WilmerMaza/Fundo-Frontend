import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { KEYSESSION } from '../models/constan';
import { DataUser, session } from '../models/dataUserModel';
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
        const tokenPayload: any = "";

        // Obtener la fecha de expiración del token en segundos
        const expirationDateInSeconds = tokenPayload.exp;

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
  readonly getDataUser: Observable<DataUser> = this.select((state: session) => {
    const tokenPayload: any = "jwtDecode(state.token)";
    const { dataUser } = tokenPayload;
    return dataUser;
  });
}
