import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiUserProfileComponent } from './ui-user-profile.component';

describe('UiUserProfileComponent', () => {
  let component: UiUserProfileComponent;
  let fixture: ComponentFixture<UiUserProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UiUserProfileComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
