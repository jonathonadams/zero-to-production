import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TodoFeatureShellComponent } from './todos-feature-shell.component';

// TODO -> TESTS
describe('TodoFeatureShellComponent', () => {
  let component: TodoFeatureShellComponent;
  let fixture: ComponentFixture<TodoFeatureShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodoFeatureShellComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoFeatureShellComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
