import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { ActivatedRoute, Params } from '@angular/router';
import { concatMap } from 'rxjs';
import { Ijwt } from 'src/app/models/dataUserModel';
import { AuthService } from 'src/app/services/auth-service.service';
import { Persistence } from 'src/app/services/persistence.service';
import { TableDinamicColspanComponent } from 'src/app/shared/table-dinamic-colspan/table-dinamic-colspan.component';
import { TableDinamicComponent } from 'src/app/shared/table-dinamic/table-dinamic.component';
import { Toast } from 'src/app/utils/alert_Toast';
import { DateTimeUtil } from 'src/app/utils/class/DateTimeUtil';
import { PAISES_LIST } from 'src/app/utils/constants/PaisesList';
import { columnsDinamic } from 'src/app/utils/interface/columnsDinamic';
import { Value } from 'src/app/utils/interface/value';
import { Validators } from 'src/app/utils/Validators';
import { environment } from 'src/environments/environment';
import { StepperComponent } from '../../../../shared/stepper/stepper.component';
import { SteperDinamic } from '../../../../utils/interface/SteperDinamic';
import { SteperDeportistas } from '../../constants/SteperDeportistas';
import {
  ColspanMejor,
  TableCompeticionAthlete,
  TableRegisterAthlete,
} from '../../constants/TableRegisterAthlete';
import { Deportista, ResponseDeportistaList } from '../../interface/Deportista';
import { Intento, IntentosPartida } from '../../interface/IntentosPartida';
import { ResponseDeportista } from '../../interface/responseDeportista';
import { RegisterService } from '../../services/register.service';
@Component({
  selector: 'app-registration-platform',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    CommonModule,
    StepperComponent,
    TableDinamicComponent,
    TableDinamicColspanComponent,
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './registration-platform.component.html',
  styleUrl: './registration-platform.component.scss',
})
export class RegistrationPlatformComponent implements OnInit {
  public dataSteper: SteperDinamic[] = SteperDeportistas;
  public open: boolean = false;
  public columnTable: columnsDinamic[] = TableRegisterAthlete;
  public columnTableColspan: columnsDinamic[] = [];
  public dataSource: any[] = [];
  public dataSourceColspan: any[] = [];
  public partidaId: string = '';
  public isbutton: boolean = true;
  public isbuttonCompeticion: boolean = false;
  public istableColspan: boolean = false;
  private keyCompeticion: string = 'isRegister';
  private urlSSEMovil: string = `${environment.gatewayUrlFundo}puntuaciones/movil/`;
  private keyValid: boolean = false;
  public isPublic: boolean = false;
  private dataAthleta: any = [];

  constructor(
    private authService$: AuthService,
    private registerService$: RegisterService,
    private cdr: ChangeDetectorRef,
    private persistence$: Persistence,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.isPublic = this.route.snapshot.data['Public'];

    if (!this.isPublic) {
      this.keyValid = this.persistence$.get(this.keyCompeticion);
      this.gethall();
      this.validCompeticion();
    } else {
      this.isbuttonCompeticion = true;
      this.istableColspan = true;
      this.publicBoardInformation();
    }
  }

  publicBoardInformation(): void {
    this.route.queryParams
      .pipe(
        concatMap(({ hall }: Params) => {
          this.partidaId = hall;
          return this.registerService$.getAthleteAll(this.partidaId);
        }),
        concatMap((res: ResponseDeportistaList[]) => {
          res.map((item: ResponseDeportistaList) => {
            item.Name = `${item.Name} ${item.LastName}`;
            item.Birthdate = new DateTimeUtil(item.Birthdate).getFormattedDate(
              'DD-MM-YYYY'
            );
            item.IwfCoiCode = PAISES_LIST.find(
              (iwf: Value) => iwf.value === item.IwfCoiCode
            )!.name;
          });
          this.dataSource = res;
          this.dataCalificacion();
          this.registerService$.setupSSE(
            `${this.urlSSEMovil}${this.partidaId}`
          );
          return this.registerService$.notificaciones$;
        })
      )
      .subscribe({
        next: ({ body }: any) => {
          if (!Validators.isNullOrUndefined(body)) {
            this.dataCalificacion();
          }
        },
        error: (error) => {
          console.error('Error:', error);
        },
      });
  }

  validCompeticion(): void {
    if (this.keyValid) {
      this.isbuttonCompeticion = true;
      this.istableColspan = true;
      this.dataCalificacion();
    }
  }

  openRegister(): void {
    this.open = !this.open;
  }

  gethall(): void {
    if (this.keyValid) {
      this.authService$.getDataUser
        .pipe(
          concatMap(({ hall }: Ijwt) => {
            this.partidaId = hall;
            this.columnTableColspan = TableCompeticionAthlete;
            this.getInformation(this.partidaId);
            this.registerService$.setupSSE(`${this.urlSSEMovil}${hall}`);
            return this.registerService$.notificaciones$;
          })
        )
        .subscribe({
          next: ({ body }: any) => {
            if (!Validators.isNullOrUndefined(body)) {
              this.dataCalificacion();
            }
          },
          error: (error) => {
            console.error('Error:', error);
          },
        });
    } else {
      this.authService$.getDataUser.subscribe(({ hall }: Ijwt) => {
        this.partidaId = hall;
        this.getInformation(this.partidaId);
      });
    }
  }

  nextAthlete(event: any): void {
    this.registerService$.boardEventSent(event, this.partidaId).subscribe();
  }

  terminarRegistro(): void {
    this.istableColspan = true;
    this.persistence$.save(this.keyCompeticion, true);
    this.dataCalificacion();
  }

  defaulDataIntentos(): void {
    this.dataSource.forEach((athlete, index: number) => {
      athlete.firstArranque = athlete.Primer_Arranque;
      athlete.firstEnvion = athlete.Primer_Envion;
      athlete.id = index + 1;
      athlete.evaluarNumber = athlete.Primer_Arranque;
      athlete.intento = 1;
      athlete.tipoCompeticion = 'Arranque';
    });
    this.dataSourceColspan = this.dataSource;
    this.cdr.detectChanges();
  }

  dataCalificacion(): void {
    const tablePublic = TableCompeticionAthlete.concat(ColspanMejor);
    this.columnTableColspan = this.isPublic
      ? tablePublic
      : TableCompeticionAthlete;

    this.registerService$
      .getAthleteIntentosPartida(this.partidaId)
      .subscribe((intentosPartida: IntentosPartida[]) => {
        if (Validators.isEmpy(intentosPartida)) {
          this.defaulDataIntentos();
          return;
        }

        const dataAthlete = this.dataSource.map(
          (athlete: ResponseDeportistaList, index: number) => {
            let intentoAEvaluar = false;
            const intentoAthleteArranque = intentosPartida.find(
              (intento: IntentosPartida) =>
                intento.deportista_id === athlete.Id &&
                intento.tipo === 'Arranque'
            );

            const intentoAthleteEnvion = intentosPartida.find(
              (intento: IntentosPartida) =>
                intento.deportista_id === athlete.Id &&
                intento.tipo === 'Envión'
            );

            this.dataAthleta = athlete

            this.processAthleteAttempts(
              intentoAthleteArranque,
              'Arranque'
            );

            this.processAthleteAttempts(
              intentoAthleteEnvion,
              'Envion'
            );

            athlete = this.dataAthleta

            if (
              !intentoAthleteEnvion &&
              !intentoAEvaluar &&
              intentoAthleteArranque?.intentos?.length === 3 && !athlete.evaluarNumber
            ) {
              return {
                ...athlete,
                firstEnvion: athlete.Primer_Envion,
                intento: 1,
                id: index + 1,
                totalEnvion: null,
                evaluarNumber: athlete.Primer_Envion,
                tipoCompeticion: 'Envión',
              };
            }

            if (!intentoAthleteArranque && !intentoAthleteEnvion) {
              athlete.evaluarNumber = athlete.Primer_Arranque;
              athlete.tipoCompeticion = 'Arranque';
              return {
                ...athlete,
                firstArranque: athlete.Primer_Arranque,
                firstEnvion: athlete.Primer_Envion,
                id: index + 1,
                intento: 1,
                totalArranque: null
              };
            } else {
              return {
                ...athlete,
                Primer_Arranque: undefined,
                Primer_Envion: undefined,
                id: index + 1,
              };
            }
          }
        );

        this.sortAndAssignPlace(
          dataAthlete,
          'totalArranque',
          'totalATiempo',
          'lugarArranque'
        );

        this.sortAndAssignPlace(
          dataAthlete,
          'totalEnvion',
          'totalETiempo',
          'lugarEnvion'
        );

        dataAthlete.forEach((athlete) => {
          if (!Validators.isNullOrUndefined(athlete.totalArranque) && !Validators.isNullOrUndefined(athlete.totalEnvion)) {
            athlete.total = athlete.totalArranque! + athlete.totalEnvion!
          }
        })

        this.sortAndAssignPlace(
          dataAthlete,
          'total',
          'totalETiempo',
          'lugar'
        );

        this.dataSourceColspan = dataAthlete;
        this.cdr.detectChanges();
      });
  }

  sortAndAssignPlace(
    dataAthlete: any[],
    totalKey: string,
    timeKey: string,
    placeKey: string
  ): void {
    const sortedAthletes = [...dataAthlete].sort((a, b) => {
      if (b[totalKey] !== a[totalKey]) {
        return b[totalKey]! - a[totalKey]!;
      }
      return new Date(a[timeKey]!).getTime() - new Date(b[timeKey]!).getTime();
    });

    sortedAthletes.forEach((item, index) => {
      dataAthlete.forEach((athlete) => {
        if (athlete.Id === item.Id && item[totalKey] && item[totalKey] > 0) {
          athlete[placeKey] = index + 1;
        }
        if (!athlete[placeKey] && athlete.Id === item.Id) {
          athlete[placeKey] = '---';
        }
      });
    });
  }

  processAthleteAttempts(
    intentoAthlete: any,
    tipoCompeticion: string
  ): void {
    if (intentoAthlete && intentoAthlete.intentos.length <= 3) {
      this.dataAthleta.tipoCompeticion = tipoCompeticion === 'Envion' ? 'Envión' : tipoCompeticion;

      intentoAthlete.intentos.forEach((intentos: Intento, index: number) => {
        if (intentos.resultado === 'Evaluar') {
          this.dataAthleta.evaluarNumber = intentos.peso;
          this.dataAthleta.intento = index + 1;
          this.dataAthleta.tiempo = intentos.tiempo;
        }
      });

      const intentosExitosos = intentoAthlete.intentos.filter(
        (i: Intento) => i.resultado === 'Éxito'
      );

      if (intentosExitosos.length > 0) {
        const total = intentosExitosos[intentosExitosos.length - 1];
        this.dataAthleta[`total${tipoCompeticion}`] = total.peso;
        this.dataAthleta[`total${tipoCompeticion[0]}Tiempo`] = total.tiempo;
      } else {
        this.dataAthleta[`total${tipoCompeticion}`] = 0;
      }

      this.dataAthleta = {
        ...  this.dataAthleta,
        [`first${tipoCompeticion}`]:
          intentoAthlete?.intentos[0]?.peso || undefined,
        [`first${tipoCompeticion}Valid`]:
          intentoAthlete?.intentos[0]?.resultado,
        [`second${tipoCompeticion}`]:
          intentoAthlete?.intentos[1]?.peso || undefined,
        [`second${tipoCompeticion}Valid`]:
          intentoAthlete?.intentos[1]?.resultado,
        [`third${tipoCompeticion}`]:
          intentoAthlete?.intentos[2]?.peso || undefined,
        [`third${tipoCompeticion}Valid`]:
          intentoAthlete?.intentos[2]?.resultado,
      };
    }
  }

  mergeArraysById(arr1: any[], arr2: any[]): any[] {
    // Crear un mapa para los objetos del primer arreglo
    const map = new Map<number, any>();

    arr1.forEach((item) => {
      map.set(item.id, item);
    });

    // Iterar sobre el segundo arreglo y combinar objetos usando el mapa
    arr2.forEach((item) => {
      if (map.has(item.id)) {
        const existingItem = map.get(item.id);
        map.set(item.id, { ...existingItem, ...item });
      } else {
        map.set(item.id, item);
      }
    });

    // Convertir el mapa de vuelta a un array
    return Array.from(map.values());
  }

  registerDeportista = (data: Deportista[]): void =>
    this.concatMapInfomation(data);

  mergeObjectsInArray(arr: Deportista[]): any {
    return arr.reduce((acc, obj) => {
      return { ...acc, ...obj };
    }, {});
  }

  concatMapInfomation(data: Deportista[]): void {
    this.authService$.getDataUser
      .pipe(
        concatMap(({ hall }: Ijwt) => {
          const requestAthlete = {
            ...this.mergeObjectsInArray(data),
            Id_Partida: hall,
          };
          return this.registerService$.registerAthleta(requestAthlete);
        })
      )
      .subscribe({
        next: (response: ResponseDeportista) => {
          Toast.fire({
            icon: 'success',
            title: response.message,
          });

          this.getInformation(this.partidaId);
        },
        error: (error) => {
          console.error('Error:', error);
        },
      });
  }

  getInformation(partidaId: string) {
    this.registerService$
      .getAthleteAll(partidaId)
      .subscribe((res: ResponseDeportistaList[]) => {
        res.map((item: ResponseDeportistaList) => {
          item.Name = `${item.Name} ${item.LastName}`;
          item.Birthdate = new DateTimeUtil(item.Birthdate).getFormattedDate(
            'DD-MM-YYYY'
          );
          item.IwfCoiCode = PAISES_LIST.find(
            (iwf: Value) => iwf.value === item.IwfCoiCode
          )!.name;
        });

        this.dataSource = res;
        this.isbutton = !(this.dataSource.length > 0);
      });
  }
}
