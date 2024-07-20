import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDinamicComponent } from './table-dinamic.component';

describe('TableDinamicComponent', () => {
  let component: TableDinamicComponent;
  let fixture: ComponentFixture<TableDinamicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableDinamicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableDinamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
