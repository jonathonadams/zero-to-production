import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilderComponent } from './form-builder.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilderFacade } from '../+state/form-builder.facade';
import { FormBuilderConstructorService } from '../form-constructor.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

describe('FormBuilderComponent', () => {
  let component: FormBuilderComponent;
  let fixture: ComponentFixture<FormBuilderComponent>;
  // let facade: FormBuilderFacade;
  // let constructorService: FormBuilderConstructorService;
  const formBuilderSpy = {
    selectedForm$: of(jest.fn())
  };

  const constructorSpy = {
    toolBoxGroupId: jest.fn(),
    toolBoxFieldId: jest.fn(),
    dropListIds$: jest.fn()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [FormBuilderComponent],
      providers: [
        { provide: FormBuilderFacade, useValue: formBuilderSpy },
        { provide: FormBuilderConstructorService, useValue: constructorSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBuilderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
