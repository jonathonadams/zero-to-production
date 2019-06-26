import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let themeService: ThemeService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThemeService, { provide: DOCUMENT, useValue: {} }]
    });
    themeService = TestBed.get<ThemeService>(ThemeService);
  });

  it('should be created', () => {
    expect(themeService).toBeTruthy();
  });
});
