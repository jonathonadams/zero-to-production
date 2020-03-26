import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleDynamicFormComponent } from './dynamic-form.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ExamplesFacade } from '@ztp/examples/data-access';
import { of } from 'rxjs';
import { DynamicFormFacade } from '@ztp/common/dynamic-form';
import { CodeHighlightService } from '@ztp/examples/utils';
import { ExamplesUtilsModule } from '@ztp/examples/utils';

describe('ExampleDynamicFormComponent', () => {
  let component: ExampleDynamicFormComponent;
  let fixture: ComponentFixture<ExampleDynamicFormComponent>;
  const facadeSpy = { selectExampleById: jest.fn() };
  const dynamicFormSpy = {
    createFormIfNotExist: jest.fn(),
    formSubmits$: () => of(jest.fn()),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ExamplesUtilsModule],
      declarations: [ExampleDynamicFormComponent],
      providers: [
        { provide: ExamplesFacade, useValue: facadeSpy },
        { provide: DynamicFormFacade, useValue: dynamicFormSpy },
        { provide: CodeHighlightService, useValue: {} },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleDynamicFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
