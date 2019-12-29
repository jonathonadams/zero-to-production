import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleTodosComponent } from './example-todos.component';

describe('ExampleTodosComponent', () => {
  let component: ExampleTodosComponent;
  let fixture: ComponentFixture<ExampleTodosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExampleTodosComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
