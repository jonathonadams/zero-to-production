import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiFormErrorsComponent } from './ui-form-errors.component';

describe('UiFormErrorsComponent', () => {
  let component: UiFormErrorsComponent;
  let fixture: ComponentFixture<UiFormErrorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UiFormErrorsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiFormErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
