import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { AuthFacade } from '../+state/auth.facade';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authService: AuthService;
  let authFacade: AuthFacade;

  const authFacadeSpy = { logout: jest.fn() };
  const authServiceSpy = { checkUserIsLoggedIn: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: AuthFacade, useValue: authFacadeSpy }
      ]
    });

    authGuard = TestBed.get<AuthGuard>(AuthGuard);
    authService = TestBed.get<AuthService>(AuthService);
    authFacade = TestBed.get<AuthFacade>(AuthFacade);
  });

  it('should allow access and not navigate if the user is logged in', () => {
    const spy = jest.spyOn(authFacade, 'logout');

    authService.checkUserIsLoggedIn = jest.fn(() => true);

    expect(authGuard.canActivate()).toEqual(true);
    expect(spy).not.toHaveBeenCalled();
    spy.mockReset();
  });

  it('should dispatch a logout action if the user is not logged in', () => {
    const spy = jest.spyOn(authFacade, 'logout');
    authService.checkUserIsLoggedIn = jest.fn(() => false);

    expect(authGuard.canActivate()).toEqual(false);
    expect(spy).toHaveBeenCalled();
    spy.mockReset();
  });
});
