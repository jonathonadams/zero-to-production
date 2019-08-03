import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomUsernameInputComponent } from './custom-username-input.component';

describe('CustomUsernameInputComponent', () => {
  let component: CustomUsernameInputComponent;
  let fixture: ComponentFixture<CustomUsernameInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomUsernameInputComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomUsernameInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
