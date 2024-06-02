import { Component, OnInit, OnDestroy } from '@angular/core';
import { TimerService } from '../services/Timer.service';
import { datos, cronometro } from '../Timer/Interface/Datos-interfaces';
import { generalPais } from '../Timer/Interface/pais.util';

@Component({
  selector: 'app-timer2',
  standalone: true,
  imports: [],
  templateUrl: './timer2.component.html',
  styleUrls: ['./timer2.component.scss'],
})
export class Timer2Component implements OnInit, OnDestroy {
  public informacion: datos = {} as datos;
  public Cronometro: cronometro = {} as cronometro;
  private intervalId: any;
  
  private totalSeconds: number =  60;  // Tiempo total configurable
  public currentSeconds: number = 0; // Segundos transcurridos
  public running: boolean = false;
  private pausedTime: number = 0; // Tiempo almacenado al pausar

  constructor(private timerService$: TimerService) {}

  ngOnInit(): void {
    this.timerService$.getListAthletes().subscribe((athletes: datos[]) => {
      this.informacion = athletes[1];
      console.log(athletes);
    });
  }

  ngOnDestroy() {
    this.clearTimer();
  }

  startTimer() {
    if (!this.running && this.currentSeconds < this.totalSeconds) {
      this.running = true;
      this.intervalId = setInterval(() => {
        this.currentSeconds++;
        if (this.currentSeconds >= this.totalSeconds) {
          this.pauseTimer() 
        }
      }, 1000);
    }
  }

  pauseTimer() {
    if (this.running) {
      this.running = false;
      this.clearTimer();
      this.pausedTime = this.currentSeconds; // Almacenar el tiempo al pausar
    }
  }
//MODIFICAR
  stopTimer() {
    if (!this.running && this.pausedTime > 0) {
      this.currentSeconds = this.pausedTime; // Continuar desde el tiempo pausado
      this.startTimer(); // Reanudar el cronómetro
    }
    
  }

  resetTimer() {

    this.running = false;
    this.clearTimer();
    this.currentSeconds = 0;
    this.totalSeconds = 60; // Restablecer el tiempo total a su valor original
   
  }

  increaseTime(secondsToAdd: number) {
    this.totalSeconds += secondsToAdd;
  }

  clearTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  get formattedTime(): string {
    const min = Math.floor(this.currentSeconds / 60);
    const sec = this.currentSeconds % 60;
    const formattedMin = min < 10 ? `0${min}` : min;
    const formattedSec = sec < 10 ? `0${sec}` : sec;
    return `${formattedMin}:${formattedSec}`;
  }

  sentCronometro(action: string, partidaId: string): void {
    this.timerService$.postListCronometro(action, partidaId).subscribe();
    switch(action) {
      case 'start':
        this.startTimer();
        break;
      case 'pause':
        this.pauseTimer();
        break;
      case 'stop':
        this.stopTimer();
        break;
      case 'return':
        this.resetTimer();
        break;
      case 'increase time':
        this.increaseTime(60); // Aumentar 60 segundos
        break;
      // Puedes añadir más casos aquí si es necesario
      default:
        break;
    }
  }

  generalPais(pais: string): string {
    return generalPais(pais);
  }
}
