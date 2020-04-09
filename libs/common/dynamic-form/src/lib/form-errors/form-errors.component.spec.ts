import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { FormErrorsComponent } from './form-errors.component';
import { PrivateDynamicFormFacade } from '../+state/private-dynamic-form.facade';

describe('FormErrorsComponent', () => {
  let component: FormErrorsComponent;
  let fixture: ComponentFixture<FormErrorsComponent>;
  let facade: PrivateDynamicFormFacade;

  const facadeSpy = {
    selectErrors: of(jest.fn()),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      declarations: [FormErrorsComponent],
      providers: [{ provide: PrivateDynamicFormFacade, useValue: facadeSpy }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    facade = TestBed.inject<PrivateDynamicFormFacade>(PrivateDynamicFormFacade);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormErrorsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
