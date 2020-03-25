import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TodosFacade } from '@uqt/todos/data-access';
import { AllTodosComponent } from './all-todos.component';
import { DynamicFormFacade } from '@uqt/common/dynamic-form';

describe('AllTodosComponent', () => {
  let component: AllTodosComponent;
  let fixture: ComponentFixture<AllTodosComponent>;
  let todosFacade: TodosFacade;
  let formFacade: DynamicFormFacade;
  const todosFacadeSpy = {
    filteredTodo$: jest.fn(),
    allTodoFilter$: jest.fn(),
  };
  const formFacadeSpy = {
    createFormIfNotExist: jest.fn(),
    formSubmits$() {
      return { subscribe: jest.fn() };
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AllTodosComponent],
      providers: [
        { provide: TodosFacade, useValue: todosFacadeSpy },
        { provide: DynamicFormFacade, useValue: formFacadeSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    todosFacade = TestBed.inject<TodosFacade>(TodosFacade);
    formFacade = TestBed.inject<DynamicFormFacade>(DynamicFormFacade);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTodosComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
