import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiFormErrorsComponent } from './ui-form-errors.component';
import { FormErrorPipe } from '../form-error.pipe';

describe('UiFormErrorsComponent', () => {
  let component: UiFormErrorsComponent;
  let fixture: ComponentFixture<UiFormErrorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UiFormErrorsComponent, FormErrorPipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiFormErrorsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
