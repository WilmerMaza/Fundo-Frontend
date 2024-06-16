import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth-service.service';
import { FundoService } from 'src/app/services/Fundo.service';
import { Persistence } from 'src/app/services/persistence.service';
import { RequestLogin, RequestSuccessfull } from '../model/defaulPlatform';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private Auth$: AuthService,
    private persistence$: Persistence, private fundoService$: FundoService) { }

  setAuth(values: any): void {
    this.Auth$.setAuth(values);
  }

  logout(): void {
    this.persistence$.deleteAll();
  }


  sessionLogin(data: RequestLogin): Observable<RequestSuccessfull> {
    const endpoint = 'auth/login';
    return this.fundoService$.post<Observable<RequestSuccessfull>>(endpoint, data).pipe(tap(async (UserInfo: any) => {
      this.setAuth(UserInfo);
    }));
  }
}
