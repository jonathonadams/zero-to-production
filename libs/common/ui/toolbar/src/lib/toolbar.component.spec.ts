import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonUiToolbarComponent } from './toolbar.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

// TODO -> TESTS

describe('CommonUiToolbarComponent', () => {
  let component: CommonUiToolbarComponent;
  let fixture: ComponentFixture<CommonUiToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CommonUiToolbarComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonUiToolbarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
