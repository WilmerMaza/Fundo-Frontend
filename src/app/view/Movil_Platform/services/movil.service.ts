import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FundoService } from 'src/app/services/Fundo.service';
import { DataDeportista, requestSuccefull } from '../../Timer_Platform/Interface/Datos-interfaces';

@Injectable({
  providedIn: 'root'
})
export class MovilService {
  private notificaciones = new Subject<DataDeportista>();
  notificaciones$: Observable<DataDeportista> = this.notificaciones.asObservable();
  private eventSources: { [key: string]: EventSource } = {};
  constructor(private fundoService$: FundoService) { }


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

  postListCronometro(event: string, partidaId: string, body: any): Observable<requestSuccefull> {
    const endpoint = `putu/Register/${event}/${partidaId}`;
    return this.fundoService$.post(endpoint, body);
  }
}
