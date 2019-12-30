import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilderConfigComponent } from './form-config.component';

describe('FormBuilderConfigComponent', () => {
  let component: FormBuilderConfigComponent;
  let fixture: ComponentFixture<FormBuilderConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormBuilderConfigComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBuilderConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
