import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosOutlineComponent } from './todos-outline.component';

describe('TodosOutlineComponent', () => {
  let component: TodosOutlineComponent;
  let fixture: ComponentFixture<TodosOutlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodosOutlineComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosOutlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
