import { Injectable } from '@angular/core';
import { FundoService } from '../../../services/Fundo.service';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  constructor(private fundoService$: FundoService) { }


  getListAthletes() {
    const endpoin = 'register/athletes'
    return this.fundoService$.get(endpoin)
  }

}
