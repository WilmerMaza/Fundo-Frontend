import { Component, OnInit } from '@angular/core';
import { generalPais } from '../../../utils/pais.util';
import { BoardComponent } from '../components/board/board.component';
import { Athlete, DataDeportista } from '../Interface/Datos-interfaces';
import { TimerService } from '../services/Timer.service';
@Component({
  selector: 'app-timerpublic',
  standalone: true,
  imports: [BoardComponent],
  templateUrl: './timer_Public.component.html',
  styleUrl: './timer_Public.component.scss',
})
export class TimerComponent implements OnInit {
  public dataAthlete: Athlete = {} as Athlete;
  public currentSeconds: number = 0;
  constructor(private timerService$: TimerService) { }

  ngOnInit(): void {

    this.getInformation();
  }

  getInformation(): void {
    this.timerService$.notificaciones$.subscribe(({ body }: DataDeportista) => {
      this.dataAthlete = body;
    });
  }

  generalPais(pais: string): string {
    return generalPais(pais);
  }

  get formattedTime(): string {
    const min = Math.floor(this.currentSeconds / 60);
    const sec = this.currentSeconds % 60;
    const formattedMin = min < 10 ? `0${min}` : min;
    const formattedSec = sec < 10 ? `0${sec}` : sec;
    return `${formattedMin}:${formattedSec}`;
  }
}
