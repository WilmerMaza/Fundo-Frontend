import { Component } from '@angular/core';
import { Paises } from './Interface/Paises-interface';
import { Router } from '@angular/router';
@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss'
})
export class TimerComponent {
  option: Paises={ code:'ar'};

}
