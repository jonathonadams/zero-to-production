import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTodosComponent } from './all-todos.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TodosFacade } from '@workspace/frontend/todos/data-access';

describe('AllTodosComponent', () => {
  let component: AllTodosComponent;
  let fixture: ComponentFixture<AllTodosComponent>;

  let todosFacade: TodosFacade;
  let todosFacadeSpy = { filteredTodo$: jest.fn(), allTodoFilter$: jest.fn() };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AllTodosComponent],
      providers: [{ provide: TodosFacade, useValue: todosFacadeSpy }],

      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    todosFacade = TestBed.get<TodosFacade>(TodosFacade);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTodosComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
