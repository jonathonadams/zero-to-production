import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormComponent } from './form.component';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { DynamicFormFacade } from '../+state/dynamic-form.facade';
import { ReactiveFormsModule } from '@angular/forms';

describe('DynamicFormComponent', () => {
  let component: DynamicFormComponent;
  let fixture: ComponentFixture<DynamicFormComponent>;
  let debugEl: DebugElement;
  let facade: DynamicFormFacade;
  const facadeSpy = {
    structure$: jest.fn(),
    data$: jest.fn(),
    touched$: jest.fn()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [DynamicFormComponent],
      providers: [{ provide: DynamicFormFacade, useValue: facadeSpy }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    facade = TestBed.get<DynamicFormFacade>(DynamicFormFacade);
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
