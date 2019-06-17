import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiTodoItemComponent } from './ui-todo.component';

describe('UiTodoItemComponent', () => {
  let component: UiTodoItemComponent;
  let fixture: ComponentFixture<UiTodoItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UiTodoItemComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiTodoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
