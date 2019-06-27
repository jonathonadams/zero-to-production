import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileComponent } from './user-profile.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthUserFacade } from '@workspace/frontend/data-access/user-auth';
import { UsersFacade } from '@workspace/frontend/data-access/users';
import { ThemeService } from '@workspace/frontend/common/theme';
import { of } from 'rxjs';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let authFacade: AuthUserFacade;
  let userFacade: UsersFacade;
  let themeService: ThemeService;

  const authFacadeSpy = {
    authUser$: of(jest.fn())
  };
  const userFacadeSpy = {};
  const themServiceSpy = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [UserProfileComponent],
      providers: [
        { provide: AuthUserFacade, useValue: authFacadeSpy },
        { provide: UsersFacade, useValue: userFacadeSpy },
        { provide: ThemeService, useValue: themServiceSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    authFacade = TestBed.get<AuthUserFacade>(AuthUserFacade);
    userFacade = TestBed.get<UsersFacade>(UsersFacade);
    themeService = TestBed.get<ThemeService>(ThemeService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
