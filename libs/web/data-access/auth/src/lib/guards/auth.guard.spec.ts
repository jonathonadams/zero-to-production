import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { AuthFacade } from '../+state/auth.facade';
import { of } from 'rxjs';
import { cold } from 'jest-marbles';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authService: AuthService;
  let authFacade: AuthFacade;

  const authFacadeSpy = { logout: jest.fn(), isAuthenticated$: of(jest.fn()) };
  const authServiceSpy = { isLoggedIn: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: AuthFacade, useValue: authFacadeSpy }
      ]
    });

    authGuard = TestBed.inject<AuthGuard>(AuthGuard);
    authService = TestBed.inject<AuthService>(AuthService);
    authFacade = TestBed.inject<AuthFacade>(AuthFacade);
  });

  it('should call the AuthService.isLoggedIn method', () => {
    const authSpy = jest.spyOn(authService, 'isLoggedIn');
    jest.resetAllMocks();

    authGuard.canActivate();

    expect(authSpy).toHaveBeenCalled();
  });

  it('should call the AuthFacade.logout if authenticated', () => {
    const spy = jest.spyOn(authFacade, 'logout');
    authFacade.isAuthenticated$ = of(false);

    jest.resetAllMocks();

    authGuard.canActivate().subscribe();

    expect(spy).toHaveBeenCalled();
  });

  it('should not allow if the user is authenticated', () => {
    authFacade.isAuthenticated$ = of(true);

    const completion = cold('(a|)', { a: true });

    expect(authGuard.canActivate()).toBeObservable(completion);
  });

  it('should not allow access if the user is unauthenticated', () => {
    authFacade.isAuthenticated$ = of(false);

    const completion = cold('(a|)', { a: false });

    expect(authGuard.canActivate()).toBeObservable(completion);
  });
});
