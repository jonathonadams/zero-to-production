import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilderFieldComponent } from './form-field.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

describe('FormBuilderFieldComponent', () => {
  let component: FormBuilderFieldComponent;
  let fixture: ComponentFixture<FormBuilderFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [FormBuilderFieldComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBuilderFieldComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
