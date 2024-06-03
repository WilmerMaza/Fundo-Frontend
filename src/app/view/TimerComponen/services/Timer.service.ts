import { Injectable } from '@angular/core';
import { FundoService } from '../../../services/Fundo.service';
import { Observable } from 'rxjs';
import { datos, requestSuccefull } from '../Timer/Interface/Datos-interfaces';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  constructor(private fundoService$: FundoService) {}

  getListAthletes(): Observable<datos[]> {
    const endpoin = 'register/athletes';
    return this.fundoService$.get(endpoin);
  }

  postListCronometro(event: string, partidaId: string):Observable<requestSuccefull> {
    const endpoin = `cronometro/${event}/${partidaId}`;
    return this.fundoService$.post(endpoin);
  }
}
