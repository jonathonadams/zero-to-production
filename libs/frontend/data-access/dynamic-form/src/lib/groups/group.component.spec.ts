import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGroupComponent } from './group.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

describe('FormGroupComponent', () => {
  let component: FormGroupComponent;
  let fixture: ComponentFixture<FormGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
      declarations: [FormGroupComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGroupComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
