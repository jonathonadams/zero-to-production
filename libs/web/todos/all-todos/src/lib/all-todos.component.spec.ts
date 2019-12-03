import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TodosFacade } from '@uqt/todos/data-access';
import { AllTodosComponent } from './all-todos.component';

// TODO  -> TESTS

describe('AllTodosComponent', () => {
  let component: AllTodosComponent;
  let fixture: ComponentFixture<AllTodosComponent>;

  let todosFacade: TodosFacade;
  const todosFacadeSpy = {
    filteredTodo$: jest.fn(),
    allTodoFilter$: jest.fn()
  };

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
