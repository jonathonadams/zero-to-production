import { async, TestBed } from '@angular/core/testing';
import { WebExamplesSecureTodosModule } from './web-examples-secure-todos.module';

describe('WebExamplesSecureTodosModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [WebExamplesSecureTodosModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(WebExamplesSecureTodosModule).toBeDefined();
  });
});
