import { TestBed } from '@angular/core/testing';

import { GridLayoutService } from './grid-layout.service';

describe('GridLayoutService', () => {
  let service: GridLayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GridLayoutService],
    });
    service = TestBed.inject(GridLayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
