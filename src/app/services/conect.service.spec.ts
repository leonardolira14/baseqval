import { TestBed } from '@angular/core/testing';

import { ConectService } from './conect.service';

describe('ConectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConectService = TestBed.get(ConectService);
    expect(service).toBeTruthy();
  });
});
