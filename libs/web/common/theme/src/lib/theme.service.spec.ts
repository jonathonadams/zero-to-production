import { TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import { ThemeService } from './theme.service';

// TODO -> TESTS

describe('ThemeService', () => {
  let themeService: ThemeService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThemeService, { provide: DOCUMENT, useValue: {} }]
    });
    themeService = TestBesd.inject<ThemeService>(ThemeService);
  });

  it('should be created', () => {
    expect(themeService).toBeTruthy();
  });
});
