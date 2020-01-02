import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilderToolboxComponent } from './form-builder-toolbox.component';

describe('FormBuilderToolboxComponent', () => {
  let component: FormBuilderToolboxComponent;
  let fixture: ComponentFixture<FormBuilderToolboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormBuilderToolboxComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBuilderToolboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
