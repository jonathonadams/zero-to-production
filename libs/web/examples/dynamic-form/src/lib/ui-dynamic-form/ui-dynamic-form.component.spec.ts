import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleUiDynamicFormComponent } from './ui-dynamic-form.component';

describe('ExampleUiDynamicFormComponent', () => {
  let component: ExampleUiDynamicFormComponent;
  let fixture: ComponentFixture<ExampleUiDynamicFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExampleUiDynamicFormComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleUiDynamicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
