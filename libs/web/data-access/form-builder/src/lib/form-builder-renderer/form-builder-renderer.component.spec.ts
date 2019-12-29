import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilderRendererComponent } from './form-builder-renderer.component';

describe('FormBuilderRendererComponent', () => {
  let component: FormBuilderRendererComponent;
  let fixture: ComponentFixture<FormBuilderRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormBuilderRendererComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBuilderRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
