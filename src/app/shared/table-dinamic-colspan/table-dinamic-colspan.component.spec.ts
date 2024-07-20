import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDinamicColspanComponent } from './table-dinamic-colspan.component';

describe('TableDinamicColspanComponent', () => {
  let component: TableDinamicColspanComponent;
  let fixture: ComponentFixture<TableDinamicColspanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableDinamicColspanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableDinamicColspanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
