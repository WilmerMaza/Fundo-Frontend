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
  private totalSeconds: number = 60;
  public currentSeconds: number = 0;
  public running: boolean = false;
  private pausedTime: number = 0;

  constructor(private timerService$: TimerService) {}

  ngOnInit(): void {
    this.getInformation();
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  getInformation(): void {
    this.timerService$.getListAthletes().subscribe((athletes: datos[]) => {
      this.informacion = athletes[1];
    });
  }

  startTimer(): void {
    if (!this.running && this.currentSeconds < this.totalSeconds) {
      this.running = true;
      this.intervalId = setInterval(() => {
        this.currentSeconds++;
        if (this.currentSeconds >= this.totalSeconds) {
          this.pauseTimer();
        }
      }, 1000);
    }
  }

  pauseTimer(): void {
    if (this.running) {
      this.running = false;
      this.clearTimer();
      this.pausedTime = this.currentSeconds;
    }
  }

  stopTimer(): void {
    if (!this.running && this.pausedTime > 0) {
      this.currentSeconds = this.pausedTime;
      this.startTimer();
    }
  }

  resetTimer(): void {
    this.running = false;
    this.clearTimer();
    this.currentSeconds = 0;
    this.totalSeconds = 60;
  }

  increaseTime(secondsToAdd: number): void {
    this.totalSeconds += secondsToAdd;
  }

  clearTimer(): void {
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
    switch (action) {
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
        this.increaseTime(60);
        break;

      default:
        break;
    }
  }

  generalPais(pais: string): string {
    return generalPais(pais);
  }
}
