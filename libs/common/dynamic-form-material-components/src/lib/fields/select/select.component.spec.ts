import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSelectComponent } from './select.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FormSelectComponent', () => {
  let component: FormSelectComponent;
  let fixture: ComponentFixture<FormSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatFormFieldModule, MatSelectModule],
      declarations: [FormSelectComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSelectComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
