import { Component } from '@angular/core';
import { Paises } from '../Timer/Interface/Paises-interface';

@Component({
  selector: 'app-timer2',
  standalone: true,
  imports: [],
  templateUrl: './timer2.component.html',
  styleUrl: './timer2.component.scss'
})
export class Timer2Component {
  option: Paises={ code:'mx'};
}
