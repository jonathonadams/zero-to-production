import { async, TestBed } from '@angular/core/testing';
import { ExamplesSecureTodosModule } from './examples-secure-todos.module';

describe('ExamplesSecureTodosModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ExamplesSecureTodosModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ExamplesSecureTodosModule).toBeDefined();
  });
});
