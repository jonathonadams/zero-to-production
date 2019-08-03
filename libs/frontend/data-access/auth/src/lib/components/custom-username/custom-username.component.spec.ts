import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomUsernameComponent } from './custom-username.components';

describe('CustomUsernameComponent', () => {
  let component: CustomUsernameComponent;
  let fixture: ComponentFixture<CustomUsernameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomUsernameComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomUsernameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
