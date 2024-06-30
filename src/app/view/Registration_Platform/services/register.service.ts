import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FundoService } from 'src/app/services/Fundo.service';
import { Deportista } from '../interface/Deportista';
import { ResponseDeportista } from '../interface/responseDeportista';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private fundoService$: FundoService) { }

  registerAthleta(data: Deportista): Observable<ResponseDeportista> {
    const endpoin = 'register/Athletes'
    return this.fundoService$.post(endpoin, data)

  }
}
