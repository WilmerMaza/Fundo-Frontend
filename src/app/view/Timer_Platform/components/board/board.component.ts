import { Component, input } from '@angular/core';
import { generalPais } from '../../../../utils/pais.util';
import { Athlete } from '../../Interface/Datos-interfaces';

@Component({
    selector: 'app-board',
    standalone: true,
    imports: [],
    template: `
  <section class="athlete-section">
    <div class="scoreboard">
        <div class="scoreboard__time">{{ formattedTime() }}</div>
    </div>
    <div class="header-grid-container">
        <div class="header-grid-item">
            <div class="header-grid-item__top">{{'2'}}</div>
            <div class="header-grid-item__bottom">ATT.</div>
        </div>
        <div class="athlete-info">
            <div class="athlete-info__text">
                <h1 class="athlete-info__last-name">{{ Athlete().LastName?.toUpperCase() }}</h1>
                <h2 class="athlete-info__first-name">{{ Athlete().Name }}</h2>
            </div>
        </div>
        <div class="header-grid-item">
            <div class="header-grid-item__top">166</div>
            <div class="header-grid-item__bottom">Kg</div>
        </div>
    </div>
    <div class="details-section">
        <div class="details-grid">
            <div class="details-grid__country-name">{{ generalPais(Athlete().IwfCoiCode) }}</div>
            <div class="details-grid__flag">
                <!-- <span [class]="'flag flag-' + 'mx'"></span> -->
                <span [class]="'fi fi-'+ Athlete().IwfCoiCode"></span>
            </div>
            <div class="details-grid__player-number">{{ Athlete().Numero_Sorteo }}</div>
        </div>
    </div>
</section>`,
    styleUrls: ['./board.component.scss'],
})
export class BoardComponent {

    Athlete = input.required<Athlete>();
    formattedTime = input.required<string>();

    generalPais(pais: string): string {
        return generalPais(pais);
    }
}
