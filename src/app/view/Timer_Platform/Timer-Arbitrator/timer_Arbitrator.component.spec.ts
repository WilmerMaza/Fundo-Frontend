import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerArbitroComponent } from './timer_Arbitrator.component';

describe('Timer2Component', () => {
  let component: TimerArbitroComponent;
  let fixture: ComponentFixture<TimerArbitroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimerArbitroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimerArbitroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
