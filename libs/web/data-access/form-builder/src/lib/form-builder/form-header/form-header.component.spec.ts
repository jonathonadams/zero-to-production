import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilderHeaderComponent } from './form-header.component';

describe('FormBuilderHeaderComponent', () => {
  let component: FormBuilderHeaderComponent;
  let fixture: ComponentFixture<FormBuilderHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormBuilderHeaderComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBuilderHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
