import { async, TestBed } from '@angular/core/testing';
import { ExamplesTodosModule } from './examples-todos.module';

describe('ExamplesTodosModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ExamplesTodosModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ExamplesTodosModule).toBeDefined();
  });
});
