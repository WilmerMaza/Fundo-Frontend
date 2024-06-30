import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDeportistaComponent } from './create-deportista.component';

describe('CreateDeportistaComponent', () => {
  let component: CreateDeportistaComponent;
  let fixture: ComponentFixture<CreateDeportistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDeportistaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateDeportistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
