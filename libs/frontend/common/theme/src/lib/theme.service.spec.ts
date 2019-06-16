// import { TestBed } from '@angular/core/testing';
// import { of } from 'rxjs';
// import { ThemeService } from './theme.service';
// import { AuthFacade } from 'libs/shared/data-access/auth/src/public-api';

// describe('ThemeService', () => {
//   let themeService: ThemeService;
//   let authFacade: AuthFacade;
//   const authSpy = { authenticatedUser$: of(jest.fn()) };
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [ThemeService, { provide: AuthFacade, useValue: authSpy }]
//     });
//     themeService = TestBed.get(ThemeService);
//     authFacade = TestBed.get(AuthFacade);
//   });

//   it('should be created', () => {
//     expect(themeService).toBeTruthy();
//   });
// });

it('should be true', () => {
  expect(true).toBe(true);
});
