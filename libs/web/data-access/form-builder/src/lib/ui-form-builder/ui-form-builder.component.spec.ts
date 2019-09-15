import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiFormBuilderComponent } from './ui-form-builder.component';

describe('UiFormBuilderComponent', () => {
  let component: UiFormBuilderComponent;
  let fixture: ComponentFixture<UiFormBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UiFormBuilderComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiFormBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
