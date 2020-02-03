import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilderHeaderComponent } from './form-header.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FormBuilderHeaderComponent', () => {
  let component: FormBuilderHeaderComponent;
  let fixture: ComponentFixture<FormBuilderHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormBuilderHeaderComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBuilderHeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
