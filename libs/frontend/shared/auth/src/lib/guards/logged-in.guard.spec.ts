import { TestBed } from '@angular/core/testing';
import { LoggedInGuard } from './logged-in.guard';
import { AuthService } from '../services/auth.service';
import { authServiceStub } from '@workspace/frontend/utils/test-helpers';
import { AuthFacade } from '../+state/auth.facade';

describe('LoggedInGuard', () => {
  let loggedInGuard: LoggedInGuard;
  let authService: AuthService;
  let authFacade: AuthFacade;

  const authFacadeSpy = { loginRedirect: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoggedInGuard,
        { provide: AuthService, useValue: authServiceStub },
        { provide: AuthFacade, useValue: authFacadeSpy }
      ]
    });

    loggedInGuard = TestBed.get(LoggedInGuard);
    authService = TestBed.get(AuthService);
    authFacade = TestBed.get(AuthFacade);
  });

  it('should check if the user is logged in and dispatch a LoginRedirect if they are', () => {
    const spy = jest.spyOn(authFacade, 'loginRedirect');

    authService.checkUserIsLoggedIn = jest.fn(() => true);

    expect(loggedInGuard.canActivate()).toEqual(false);
    expect(spy).toHaveBeenCalled();
    spy.mockReset();
  });

  it('should allow access if the user is not logged in', () => {
    const spy = jest.spyOn(authFacade, 'loginRedirect');
    authService.checkUserIsLoggedIn = jest.fn(() => false);

    expect(loggedInGuard.canActivate()).toEqual(true);
    expect(spy).not.toHaveBeenCalled();
    spy.mockReset();
  });
});
