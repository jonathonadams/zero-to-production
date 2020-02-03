import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiUserProfileComponent } from './ui-user-profile.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// TODO -> TESTS

describe('UiUserProfileComponent', () => {
  let component: UiUserProfileComponent;
  let fixture: ComponentFixture<UiUserProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [UiUserProfileComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiUserProfileComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
