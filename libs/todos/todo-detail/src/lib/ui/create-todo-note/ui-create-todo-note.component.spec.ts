import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiCreateTodoNoteComponent } from './ui-create-todo-note.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('UiCreateTodoNoteComponent', () => {
  let component: UiCreateTodoNoteComponent;
  let fixture: ComponentFixture<UiCreateTodoNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UiCreateTodoNoteComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiCreateTodoNoteComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
