import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, Input, output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, Subject } from 'rxjs';
import { columnsDinamic } from 'src/app/utils/interface/columnsDinamic';
import { Validators } from 'src/app/utils/Validators';

@Component({
  selector: 'app-table-dinamic-colspan',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-dinamic-colspan.component.html',
  styleUrl: './table-dinamic-colspan.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableDinamicColspanComponent {
  public columnsToDisplay: columnsDinamic[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public dataSource = new MatTableDataSource<any>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public minUnoArranque: any | null = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public secondMinUnoArranque: any | null = null;
  @Input('column') set setColumns(value: columnsDinamic[]) {
    this.columnsToDisplay = value;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input('dataSource') set setDataSource(value: any[]) {
    this.dataSource.data = value;
    this.minUnoArranque = null;
    this.secondMinUnoArranque = null;
    this.calculateMinAndSecondMinUnoArranque();
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  nextAthelete = output<any>()
  EmiteNetx = input<boolean>()
  private nextAthleteSubject = new Subject<any>();
  public nextAthlete$ = this.nextAthleteSubject.asObservable().pipe(
    debounceTime(300)
  );

  constructor() {
    this.nextAthlete$.subscribe(athlete => {
      this.nextAthelete.emit(athlete);
    });
  }

  private calculateMinAndSecondMinUnoArranque(): void {
    const unoArranqueValues = this.dataSource.data.map(item => ({
      evaluarNumber: item.evaluarNumber,
      id: item.id,
      intento: item.intento,
      tiempo: item.tiempo,
      ...item
    }));

    const sortedValues = unoArranqueValues.sort((a, b) => {
      // Comparar evaluarNumber
      if (a.evaluarNumber !== b.evaluarNumber) {
        return (a.evaluarNumber ?? Infinity) - (b.evaluarNumber ?? Infinity);
      }

      // Comparar intento
      if (a.intento !== b.intento) {
        return (a.intento ?? Infinity) - (b.intento ?? Infinity);
      }

      // Comparar tiempo
      if (a.tiempo && b.tiempo) {
        return new Date(a.tiempo).getTime() - new Date(b.tiempo).getTime();
      }

      return 0;
    });

    this.minUnoArranque = null;
    this.secondMinUnoArranque = null;

    this.minUnoArranque = {
      value: sortedValues[0]?.evaluarNumber,
      id: sortedValues[0]?.id
    };
    this.secondMinUnoArranque = {
      value: sortedValues[1]?.evaluarNumber,
      id: sortedValues[1]?.id
    };

    if (this.EmiteNetx()) {
      this.nextAthleteSubject.next(sortedValues[0]);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public MinUnoArranque(item: any): boolean {
    // this.calculateMinAndSecondMinUnoArranque()
    return Validators.isNullOrUndefined(this.minUnoArranque) ?
      false :
      this.minUnoArranque.value === item.evaluarNumber && item.id === this.minUnoArranque.id
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public SecondArranque(item: any): boolean {
    // this.calculateMinAndSecondMinUnoArranque()
    return Validators.isNullOrUndefined(this.secondMinUnoArranque) ? false : this.secondMinUnoArranque.value === item.evaluarNumber && item.id === this.secondMinUnoArranque.id
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  successValid(item: any, name: string): boolean {
    return item[`${name}Valid`] === "Éxito"
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  FailedValid(item: any, name: string): boolean {
    return item[`${name}Valid`] === "Fallo"
  }

}