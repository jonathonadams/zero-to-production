import { async, TestBed } from '@angular/core/testing';
import { FrontendTodosTodoDetailModule } from './frontend-todos-todo-detail.module';

describe('FrontendTodosTodoDetailModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FrontendTodosTodoDetailModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FrontendTodosTodoDetailModule).toBeDefined();
  });
});
