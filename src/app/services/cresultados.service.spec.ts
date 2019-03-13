import { TestBed } from '@angular/core/testing';

import { CresultadosService } from './cresultados.service';

describe('CresultadosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CresultadosService = TestBed.get(CresultadosService);
    expect(service).toBeTruthy();
  });
});
