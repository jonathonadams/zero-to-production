import { TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import { ThemeService } from './theme.service';
import { RendererFactory2 } from '@angular/core';
import { rendererFactory2Mock } from '@ztp/tests/client';

// TODO -> TESTS

describe('ThemeService', () => {
  let themeService: ThemeService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ThemeService,
        { provide: RendererFactory2, useValue: rendererFactory2Mock },
        { provide: DOCUMENT, useValue: {} },
      ],
    });
    themeService = TestBed.inject<ThemeService>(ThemeService);
  });

  it('should be created', () => {
    expect(themeService).toBeTruthy();
  });
});
