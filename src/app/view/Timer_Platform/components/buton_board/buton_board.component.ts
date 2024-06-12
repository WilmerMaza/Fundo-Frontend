import { Component, output } from '@angular/core';

@Component({
  selector: 'app-buton_board',
  standalone: true,
  imports: [],
  templateUrl: './buton_board.component.html',
  styleUrls: ['./buton_board.component.scss']
})
export class Buton_boardComponent {

  eventButton = output<string>()

  constructor() { }

  sentEventButton(event: string): void {
    this.eventButton.emit(event);
  }



}
