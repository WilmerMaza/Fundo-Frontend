import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDashboardComponent } from './select-dashboard.component';

describe('SelectDashboardComponent', () => {
  let component: SelectDashboardComponent;
  let fixture: ComponentFixture<SelectDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
