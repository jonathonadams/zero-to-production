import { async, TestBed } from '@angular/core/testing';
import { WebExamplesTodosModule } from './web-examples-todos.module';

describe('WebExamplesTodosModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [WebExamplesTodosModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(WebExamplesTodosModule).toBeDefined();
  });
});
