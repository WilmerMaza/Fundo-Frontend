import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FundoService } from '../../../services/Fundo.service';
import { DataDeportista, requestSuccefull } from '../Interface/Datos-interfaces';

@Injectable({
  providedIn: 'root',
})
export class TimerService implements OnDestroy {
  private notificacionesSubject = new Subject<DataDeportista>();
  notificaciones$: Observable<DataDeportista> = this.notificacionesSubject.asObservable();
  private eventSources: { [key: string]: EventSource } = {};

  constructor(private fundoService$: FundoService) {}

  ngOnDestroy() {
    this.closeAllConnections();
  }

  getListAthletes(): Observable<DataDeportista[]> {
    const endpoint = 'register/athletes';
    return this.fundoService$.get(endpoint);
  }

  setupSSE(url: string): void {
    if (this.eventSources[url]) {
      console.warn(`SSE connection for URL ${url} already exists.`);
      return;
    }

    const eventSource = new EventSource(url);

    eventSource.addEventListener('message', (event: any) => {
      const data = JSON.parse(event.data);
      this.notificacionesSubject.next(data);
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

  postListCronometro(event: string, partidaId: string): Observable<requestSuccefull> {
    const endpoint = `cronometro/movil/${event}/${partidaId}`;
    return this.fundoService$.post(endpoint);
  }
}
