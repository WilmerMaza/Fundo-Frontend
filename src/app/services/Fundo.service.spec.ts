/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FundoService } from './Fundo.service';

describe('Service: Fundo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FundoService]
    });
  });

  it('should ...', inject([FundoService], (service: FundoService) => {
    expect(service).toBeTruthy();
  }));
});
