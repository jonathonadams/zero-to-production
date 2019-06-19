import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { AuthUserFacade } from '@workspace/frontend/data-access/user-auth';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let themeService: ThemeService;
  let authFacade: AuthUserFacade;
  const authSpy = { authUser$: of(jest.fn()) };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ThemeService,
        { provide: AuthUserFacade, useValue: authSpy },
        { provide: DOCUMENT, useValue: {} }
      ]
    });
    themeService = TestBed.get<ThemeService>(ThemeService);
    authFacade = TestBed.get<AuthUserFacade>(AuthUserFacade);
  });

  it('should be created', () => {
    expect(themeService).toBeTruthy();
  });
});
