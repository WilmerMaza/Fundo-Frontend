/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Buton_boardComponent } from './buton_board.component';

describe('Buton_boardComponent', () => {
  let component: Buton_boardComponent;
  let fixture: ComponentFixture<Buton_boardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Buton_boardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Buton_boardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
