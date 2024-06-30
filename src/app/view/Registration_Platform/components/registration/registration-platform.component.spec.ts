import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationPlatformComponent } from './registration-platform.component';

describe('RegistrationPlatformComponent', () => {
  let component: RegistrationPlatformComponent;
  let fixture: ComponentFixture<RegistrationPlatformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationPlatformComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrationPlatformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
