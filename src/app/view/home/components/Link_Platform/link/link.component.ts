import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Params } from '@angular/router';
import { ListPlatforma } from '../interface/ListPlatforma';
import { LinkService } from '../services/link.service';

@Component({
  selector: 'app-link',
  standalone: true,
  imports: [MatButtonModule],
  template: `<section class="content-link">
    <div class="content-title">
      <h2>
        Sala <span class="codehall">{{ hall }}</span>
      </h2>
    </div>
    @for( item of platformList ; track platformList){
    <div class="content-name">
      <div class="platform-name">
        <h3>
          {{ item.name }}
        </h3>
      </div>
      <div class="platform-link">
        <p>
          <a href="{{ item.linkClick }}" class="platform-link-name">{{
            item.link
          }}</a>
        </p>
      </div>
    </div>
    } <button mat-flat-button class="btn-link">Iniciar</button>
  </section>`,
  styleUrl: './link.component.scss',
})
export class LinkComponent implements OnInit {
  private domainName: string = '';
  public platformList: ListPlatforma[] = [];
  public hall: string = '';
  constructor(private linkService$: LinkService, private route: ActivatedRoute) {
    this.domainName = this.linkService$.getDomain();
  }
  ngOnInit(): void {
    this.paramsReques();
    this.platformList = [
      {
        name: 'Pl. de Registro',
        link: `${this.domainName}/Registration_Platform`,
        linkClick: 'Registration_Platform',
      },
      {
        name: 'Pl. Mobile',
        link: `${this.domainName}/mobile`,
        linkClick: 'mobile',
      },
      {
        name: 'Cronometro',
        link: `${this.domainName}/chronometer`,
        linkClick: 'chronometer',
      },
    ];
  }


  paramsReques(): void {
    this.route.queryParams.subscribe(({ hall }: Params) => {
      this.hall = hall
    })
  }
}
