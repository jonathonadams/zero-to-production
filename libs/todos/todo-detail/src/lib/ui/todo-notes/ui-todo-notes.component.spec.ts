import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiTodoNotesComponent } from './ui-todo-notes.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('UiTodoNotesComponent', () => {
  let component: UiTodoNotesComponent;
  let fixture: ComponentFixture<UiTodoNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UiTodoNotesComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiTodoNotesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
