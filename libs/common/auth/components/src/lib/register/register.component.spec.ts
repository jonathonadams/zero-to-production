import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { DynamicFormFacade } from '@ztp/common/dynamic-form';
import { AuthFacade } from '@ztp/common/auth/data-access';

// TODO -> TESTS
describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      providers: [
        {
          provide: AuthFacade,
          useValue: {},
        },
        {
          provide: DynamicFormFacade,
          useValue: {
            createFormIfNotExist: jest.fn(),
            formSubmits$: () => of(jest.fn()),
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
