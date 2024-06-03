import { Component, OnInit } from '@angular/core';
import { generalPais } from './Interface/pais.util';
import { datos } from './Interface/Datos-interfaces';
import { TimerService } from '../services/Timer.service';
@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss',
})
export class TimerComponent implements OnInit {
  public informacion: datos = {} as datos;

  constructor(private timerService$: TimerService) {}

  ngOnInit(): void {
    this.timerService$.getListAthletes().subscribe((athletes: datos[]) => {
      this.informacion = athletes[1];
      console.log(athletes);
    });
  }

  generalPais(pais: string): string {
    return generalPais(pais);
  }
}
