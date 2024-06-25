import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FundoService } from 'src/app/services/Fundo.service';
import { requestSuccefull } from 'src/app/view/Timer_Platform/Interface/Datos-interfaces';
import { RequestHall } from '../model/requesHall';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor(private fundoService$: FundoService) { }


  createHallLevantamiento(data: RequestHall): Observable<requestSuccefull> {
    const endpoint = 'auth/register';
    return this.fundoService$.post<requestSuccefull>(endpoint, data)
  }
}
