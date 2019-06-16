import { async, TestBed } from '@angular/core/testing';
import { FrontendTodosAllTodosModule } from './frontend-todos-all-todos.module';

describe('FrontendTodosAllTodosModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FrontendTodosAllTodosModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FrontendTodosAllTodosModule).toBeDefined();
  });
});
