import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileComponent } from './user-profile.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersFacade } from '@workspace/frontend/data-access/users';
import { ThemeService } from '@workspace/frontend/common/theme';
import { of } from 'rxjs';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let userFacade: UsersFacade;
  let themeService: ThemeService;

  const userFacadeSpy = {
    authUser$: of(jest.fn())
  };
  const themServiceSpy = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [UserProfileComponent],
      providers: [
        { provide: UsersFacade, useValue: userFacadeSpy },
        { provide: ThemeService, useValue: themServiceSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

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
