import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiRegisterComponent } from './ui-register.component';

describe('UiRegisterComponent', () => {
  let component: UiRegisterComponent;
  let fixture: ComponentFixture<UiRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UiRegisterComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
