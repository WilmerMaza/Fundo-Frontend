import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { FundoService } from '../../../services/Fundo.service';
import { DataDeportista, requestSuccefull } from '../Interface/Datos-interfaces';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private eventSource!: EventSource;
  private notificacionesSubject = new Subject<DataDeportista>();
  notificaciones$: Observable<DataDeportista> =
    this.notificacionesSubject.asObservable();
  private url: string = `${environment.gatewayUrlFundo}cronometro/web/R0JJV4`;
  constructor(private fundoService$: FundoService) {
    this.setupSSE();
  }

  getListAthletes(): Observable<DataDeportista[]> {
    const endpoin = 'register/athletes';
    return this.fundoService$.get(endpoin);
  }

  private setupSSE():void {
    this.eventSource = new EventSource(this.url);

    this.eventSource.addEventListener('message', (event: any) => {
      const data = JSON.parse(event.data);
      this.notificacionesSubject.next(data);
    });

    this.eventSource.addEventListener('error', (error) => {
      console.error('Error en la conexión SSE:', error);
    });
  }

  closeConnection() {
    if (this.eventSource) {
      this.eventSource.close();
    }
  }

  postListCronometro(event: string, partidaId: string): Observable<requestSuccefull> {
    const endpoin = `cronometro/movil/${event}/${partidaId}`;
    return this.fundoService$.post(endpoin);
  }
}
