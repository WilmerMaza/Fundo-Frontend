import { Component, OnInit } from '@angular/core';
import { Paises } from '../Timer/Interface/Paises-interface';
import { TimerService } from '../services/Timer.service';

@Component({
  selector: 'app-timer2',
  standalone: true,
  imports: [],
  templateUrl: './timer2.component.html',
  styleUrl: './timer2.component.scss'
})
export class Timer2Component implements OnInit {
  constructor(private timerService$: TimerService) { }

  ngOnInit(): void {
    
    this.timerService$.getListAthletes().subscribe((athletes) => console.log(athletes));

  }
  option: Paises = { code: 'mx' };
}
