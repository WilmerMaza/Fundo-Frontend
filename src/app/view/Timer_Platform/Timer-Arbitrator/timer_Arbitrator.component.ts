import { Component, OnDestroy, OnInit } from '@angular/core';
import { concatMap } from 'rxjs';
import { Ijwt } from 'src/app/models/dataUserModel';
import { AuthService } from 'src/app/services/auth-service.service';
import { environment } from 'src/environments/environment';
import { BoardComponent } from '../components/board/board.component';
import { Buton_boardComponent } from '../components/buton_board/buton_board.component';
import {
  Athlete,
  cronometro,
  DataDeportista,
} from '../Interface/Datos-interfaces';
import { TimerService } from '../services/Timer.service';

@Component({
  selector: 'app-timer2',
  standalone: true,
  imports: [BoardComponent, Buton_boardComponent],
  template: `<section class="scoreboard">
    <div class="scoreboard-container">
      <app-board
        class="scoreboard-board"
        [Athlete]="dataAthlete"
        [formattedTime]="formattedTime"
      ></app-board>

      <app-buton_board
        class="scoreboard-button"
        (eventButton)="sentCronometro($event)"
      ></app-buton_board>
    </div>
  </section> `,
  styleUrls: ['./timer_Arbitrator.component.scss'],
})
export class TimerArbitroComponent implements OnInit, OnDestroy {
  public dataAthlete: Athlete = {} as Athlete;
  public Cronometro: cronometro = {} as cronometro;
  private intervalId: any;
  private totalSeconds: number = 60;
  public currentSeconds: number = 0;
  public running: boolean = false;
  private pausedTime: number = 0;

  constructor(private timerService$: TimerService, private authService$: AuthService) { }

  ngOnInit(): void {
    this.getInformation();
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  getInformation(): void {
    this.concatMapInfomation();
  }

  concatMapInfomation(): void {
    this.authService$.getDataUser.pipe(
      concatMap((data: Ijwt) => {
        this.timerService$.setupSSE(`${environment.gatewayUrlFundo}cronometro/web/${data.hall}`);
        return this.timerService$.notificaciones$;
      })
    ).subscribe({
      next: ({ body }: DataDeportista) => {
        this.dataAthlete = body;
      },
      error: error => {
        console.error('Error:', error);
      }
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

  sentCronometro(action: string): void {
    const partidaId = '123';
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
}
