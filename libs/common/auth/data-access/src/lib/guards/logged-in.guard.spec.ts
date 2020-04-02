import { TestBed } from '@angular/core/testing';
import { LoggedInGuard } from './logged-in.guard';
import { AuthService } from '../services/auth.service';
import { AuthFacade } from '../+state/auth.facade';
import { of } from 'rxjs';
import { cold } from 'jest-marbles';

describe('LoggedInGuard', () => {
  let loggedInGuard: LoggedInGuard;
  let authService: AuthService;
  let authFacade: AuthFacade;

  const authFacadeSpy = {
    loginRedirect: jest.fn(),
    isAuthenticated$: of(jest.fn()),
  };
  const authServiceSpy = { isLoggedIn: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoggedInGuard,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: AuthFacade, useValue: authFacadeSpy },
      ],
    });

    loggedInGuard = TestBed.inject<LoggedInGuard>(LoggedInGuard);
    authService = TestBed.inject<AuthService>(AuthService);
    authFacade = TestBed.inject<AuthFacade>(AuthFacade);
  });

  it('should call the AuthService.isLoggedIn method', () => {
    const authSpy = jest.spyOn(authService, 'isLoggedIn');
    jest.resetAllMocks();

    loggedInGuard.canActivate();

    expect(authSpy).toHaveBeenCalled();
  });

  it('should call the AuthFacade.loginRedirect if authenticated', () => {
    const spy = jest.spyOn(authFacade, 'loginRedirect');
    authFacade.isAuthenticated$ = of(true);

    jest.resetAllMocks();

    loggedInGuard.canActivate().subscribe();

    expect(spy).toHaveBeenCalled();
  });

  it('should not allow access if the user is authenticated', () => {
    authFacade.isAuthenticated$ = of(true);

    const completion = cold('(a|)', { a: false });

    expect(loggedInGuard.canActivate()).toBeObservable(completion);
  });

  it('should allow access if the user is unauthenticated', () => {
    authFacade.isAuthenticated$ = of(false);

    const completion = cold('(a|)', { a: true });

    expect(loggedInGuard.canActivate()).toBeObservable(completion);
  });
});
