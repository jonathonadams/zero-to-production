import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormComponent } from './dynamic-form.component';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { DynamicFormFacade } from '../+state/dynamic-form.facade';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormService } from '../dynamic-form.service';
import { DynamicFormErrorsService } from '../form-errors/form-errors.service';
import { PrivateDynamicFormFacade } from '../+state/private-dynamic-form.facade';

// TODO -> TESTS
describe('DynamicFormComponent', () => {
  let component: DynamicFormComponent;
  let fixture: ComponentFixture<DynamicFormComponent>;
  let debugEl: DebugElement;
  let facade: DynamicFormFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [DynamicFormComponent],
      providers: [
        { provide: DynamicFormService, useValue: {} },
        { provide: DynamicFormErrorsService, useValue: {} },
        { provide: DynamicFormFacade, useValue: {} },
        { provide: PrivateDynamicFormFacade, useValue: {} },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    facade = TestBed.inject<DynamicFormFacade>(DynamicFormFacade);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
