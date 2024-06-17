import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
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
  selector: 'app-timerarbitro',
  standalone: true,
  imports: [BoardComponent, Buton_boardComponent],
  template: `<section class="scoreboard">
    <div class="scoreboard-container">
      <app-board
        class="scoreboard-board"
        [Athlete]="dataAthlete"
        [formattedTime]="formattedTime"
        [isPublic]="isPublic"
      ></app-board>
       @if(!isPublic){
       <app-buton_board
        class="scoreboard-button"
        (eventButton)="sentCronometro($event)"
      ></app-buton_board>}
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
  public isPublic: boolean = false;
  private urlSSEBoard: string = `${environment.gatewayUrlFundo}cronometro/Board/`;
  private urlSSERegister: string = `${environment.gatewayUrlFundo}cronometro/Register/`;
  private hall: string = '';

  constructor(private timerService$: TimerService, private authService$: AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getInformation();
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  getInformation(): void {
    this.isPublic = this.route.snapshot.data['Public'];
    if (this.isPublic) {
      this.publicBoardInformation()
      this.publicTime()
    } else {
      this.concatMapInfomation();
    }

  }


  publicBoardInformation(): void {
    this.route.queryParams.pipe(
      concatMap(({ hall }: Params) => {
        this.hall = hall;
        this.timerService$.setupSSE(`${this.urlSSEBoard}${hall}`, 'board');
        return this.timerService$.notificacionesBoard$;
      })
    ).subscribe({
      next: ({ body }: DataDeportista) => {
        this.dataAthlete = body;
      },
      error: error => {
        console.error('Error:', error);
      }
    })
  }

  publicTime(): void {
    this.timerService$.setupSSE(`${this.urlSSERegister}${this.hall}`, 'register');
    this.timerService$.notificacionesRegister$.subscribe(({ action }: DataDeportista) => {
      this.switchAction(action);
    });
  }

  concatMapInfomation(): void {
    this.authService$.getDataUser.pipe(
      concatMap(({ hall }: Ijwt) => {
        this.hall = hall;
        this.timerService$.setupSSE(`${this.urlSSEBoard}${hall}`, 'board');
        return this.timerService$.notificacionesBoard$;
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
    this.timerService$.postListCronometro(action, this.hall).subscribe();
    this.switchAction(action);

  }

  switchAction(action: string): void {
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


