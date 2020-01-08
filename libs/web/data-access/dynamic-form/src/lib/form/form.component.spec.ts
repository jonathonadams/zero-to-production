import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormComponent } from './form.component';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { DynamicFormFacade } from '../+state/dynamic-form.facade';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormService } from '../dynamic-form.service';

// TODO -> TESTS
describe('DynamicFormComponent', () => {
  let component: DynamicFormComponent;
  let fixture: ComponentFixture<DynamicFormComponent>;
  let debugEl: DebugElement;
  let facade: DynamicFormFacade;
  const facadeSpy = {
    structure$: jest.fn(),
    data$: jest.fn(),
    formIdx$: jest.fn(),
    errors$: jest.fn(),
    config$: jest.fn()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [DynamicFormComponent],
      providers: [
        {
          provide: DynamicFormFacade,
          useValue: facadeSpy
        },
        { provide: DynamicFormService, useValue: {} }
      ],
      schemas: [NO_ERRORS_SCHEMA]
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
