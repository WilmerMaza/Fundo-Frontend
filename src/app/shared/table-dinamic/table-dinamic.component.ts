import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { columnsDinamic } from 'src/app/utils/interface/columnsDinamic';
/**
 * @title Table with sorting
 */

@Component({
  selector: 'app-table-dinamic',
  standalone: true,
  imports: [MatTableModule, MatSortModule, MatPaginatorModule, MatProgressSpinnerModule, CommonModule],
  templateUrl: './table-dinamic.component.html',
  styleUrl: './table-dinamic.component.scss'
})
export class TableDinamicComponent implements AfterViewInit {
  public displayedColumns: string[] = [];
  public parentColumns: string[] = [];
  public columnsToDisplay: any[] = [];
  public dataSource = new MatTableDataSource<any>([]);
  isprueba = false

  @Input('column') set setColumns(value: columnsDinamic[]) {

    this.columnsToDisplay = value;
    value.map((item) => {

      if (item.children) {
        this.isprueba = true
      }
    })
    this.setColumn(value);
  }


  @Input('dataSource') set setDataSource(value: any[]) {
    this.isLoadingResults = true;
    this.dataSource.data = value;
    this.isLoadingResults = false;
  }
  public isLoadingResults = false;


  constructor(private _liveAnnouncer: LiveAnnouncer) {
  }

  @ViewChild(MatSort)
  sort!: MatSort;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }

  setColumn(columns: columnsDinamic[]): void {
    this.displayedColumns = [];
    this.parentColumns = [];
    columns
      .filter(c => c.estado)
      .forEach((c: columnsDinamic) => {
        if (c.children) {

          c.children.forEach(child => {
            this.displayedColumns.push(child.name);
          });

          if (!this.parentColumns.includes(c.name )) {
            this.parentColumns.push(c.name );
          }
        } else {
         
          this.displayedColumns.push(c.name);
      
        }
      });
   
      
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
