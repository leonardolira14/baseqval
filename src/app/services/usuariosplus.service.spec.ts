import { TestBed } from '@angular/core/testing';

import { UsuariosplusService } from './usuariosplus.service';

describe('UsuariosplusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsuariosplusService = TestBed.get(UsuariosplusService);
    expect(service).toBeTruthy();
  });
});
