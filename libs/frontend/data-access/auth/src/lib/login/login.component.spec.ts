import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonLoginComponent } from './login.component';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthFacade } from '@workspace/frontend/data-access/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormFacade } from '@workspace/frontend/data-access/dynamic-form';

// TODO  -> TESTS

describe('CommonLoginComponent', () => {
  let component: CommonLoginComponent;
  let fixture: ComponentFixture<CommonLoginComponent>;
  let debugEl: DebugElement;
  let nativeEl: HTMLElement;
  let authFacade: AuthFacade;
  let formFacade: DynamicFormFacade;
  const authFacadeSpy = { login: jest.fn() };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AuthFacade, useValue: authFacadeSpy },
        { provide: DynamicFormFacade, useValue: {} }
      ],
      declarations: [CommonLoginComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    authFacade = TestBed.get<AuthFacade>(AuthFacade);
    formFacade = TestBed.get<DynamicFormFacade>(DynamicFormFacade);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonLoginComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
    nativeEl = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
