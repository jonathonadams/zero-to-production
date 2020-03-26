import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { FormBuilderFacade } from '@uqt/common/form-builder';
import { DynamicFormFacade } from '@uqt/common/dynamic-form';
import { ExamplesUtilsModule } from '@uqt/examples/utils';
import { ExampleFormBuilderDisplayComponent } from './display.component';

describe('ExampleFormBuilderDisplayComponent', () => {
  let component: ExampleFormBuilderDisplayComponent;
  let fixture: ComponentFixture<ExampleFormBuilderDisplayComponent>;

  const builderSpy = {
    selectedForm$: of(jest.fn()),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ExamplesUtilsModule],
      declarations: [ExampleFormBuilderDisplayComponent],
      providers: [
        { provide: FormBuilderFacade, useValue: builderSpy },
        { provide: DynamicFormFacade, useValue: {} },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleFormBuilderDisplayComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
