import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiCreateTodoComponent } from './ui-create-todo.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

// TODO -> Tests
describe('UiCreateTodoComponent', () => {
  let component: UiCreateTodoComponent;
  let fixture: ComponentFixture<UiCreateTodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UiCreateTodoComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiCreateTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
