import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoDetailComponent } from './todo-detail.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TodosFacade } from '@workspace/frontend/todos/data-access';
import { Location } from '@angular/common';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from '@testing/stubs/activated-router.stubs';

describe('TodoDetailComponent', () => {
  let component: TodoDetailComponent;
  let fixture: ComponentFixture<TodoDetailComponent>;
  let todoFacade: TodosFacade;
  let activatedRoute: ActivatedRoute;
  let location: Location;
  const todoFacadeSpy = {
    selectedTodo$: of(jest.fn()),
    todoIds$: of(jest.fn())
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule],
      providers: [
        { provide: TodosFacade, useValue: todoFacadeSpy },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: Location, userValue: {} }
      ],
      declarations: [TodoDetailComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    todoFacade = TestBed.get<TodosFacade>(TodosFacade);
    activatedRoute = TestBed.get<ActivatedRoute>(ActivatedRoute);
    location = TestBed.get<Location>(Location);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
