import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilderToolboxComponent } from './form-builder-toolbox.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilderConstructorService } from '../form-constructor.service';

describe('FormBuilderToolboxComponent', () => {
  let component: FormBuilderToolboxComponent;
  let fixture: ComponentFixture<FormBuilderToolboxComponent>;
  let constructorService: FormBuilderConstructorService;

  const constructorSpy = {
    toolBoxFieldId: jest.fn(),
    toolBoxGroupId: jest.fn(),
    dropListIds$: jest.fn()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormBuilderToolboxComponent],
      providers: [
        { provide: FormBuilderConstructorService, useValue: constructorSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    constructorService = TestBed.inject<FormBuilderConstructorService>(
      FormBuilderConstructorService
    );
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBuilderToolboxComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
