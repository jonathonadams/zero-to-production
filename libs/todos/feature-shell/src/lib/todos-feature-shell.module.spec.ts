import { async, TestBed } from '@angular/core/testing';
import { TodosFeatureShellModule } from './todos-feature-shell.module';

describe('TodosFeatureShellModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TodosFeatureShellModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(TodosFeatureShellModule).toBeDefined();
  });
});
