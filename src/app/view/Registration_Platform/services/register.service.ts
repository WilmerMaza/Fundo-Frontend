import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FundoService } from 'src/app/services/Fundo.service';
import { Deportista, ResponseDeportistaList } from '../interface/Deportista';
import { IntentosPartida } from '../interface/IntentosPartida';
import { ResponseDeportista } from '../interface/responseDeportista';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private notificaciones = new Subject<any>();
  notificaciones$: Observable<any> = this.notificaciones.asObservable();
  private eventSources: { [key: string]: EventSource } = {};

  constructor(private fundoService$: FundoService) { }


  registerAthleta(data: Deportista): Observable<ResponseDeportista> {
    const endpoin = 'register/Athletes'
    return this.fundoService$.post(endpoin, data)
  }

  getAthleteAll(partida: string): Observable<ResponseDeportistaList[]> {
    const endpoin = `register/Athletes/${partida}`
    return this.fundoService$.get(endpoin)
  }

  getAthleteIntentosPartida(partida: string): Observable<IntentosPartida[]> {
    const endpoin = `puntuaciones/partida/${partida}`
    return this.fundoService$.get(endpoin)
  }


  setupSSE(url: string): void {
    if (this.eventSources[url]) {
      console.warn(`SSE connection for URL ${url} already exists.`);
      return;
    }

    const eventSource = new EventSource(url);

    eventSource.addEventListener('message', (event: any) => {
      const data = JSON.parse(event.data);

      this.notificaciones.next(data);

    });

    eventSource.addEventListener('error', (error) => {
      console.error('Error en la conexión SSE:', error);
    });

    this.eventSources[url] = eventSource;
  }

  closeConnection(url: string): void {
    if (this.eventSources[url]) {
      this.eventSources[url].close();
      delete this.eventSources[url];
    } else {
      console.warn(`No SSE connection found for URL ${url}.`);
    }
  }

  closeAllConnections(): void {
    for (const url in this.eventSources) {
      if (this.eventSources.hasOwnProperty(url)) {
        this.eventSources[url].close();
      }
    }
    this.eventSources = {};
  }

  boardEventSent(body: any, hall: string): Observable<any> {
    const endpoin = `cronometro/Board/Valid/${hall}`;
    return this.fundoService$.post(endpoin, body)

  }
}
