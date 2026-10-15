import { TestBed } from '@angular/core/testing';

import { CambiaCLGuard } from './cambia-cl.guard';

describe('CambiaCLGuard', () => {
  let guard: CambiaCLGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CambiaCLGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
