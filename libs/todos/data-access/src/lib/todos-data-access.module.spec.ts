import { async, TestBed } from '@angular/core/testing';
import { TodosDataAccessModule } from './todos-data-access.module';

describe('TodosDataAccessModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TodosDataAccessModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(TodosDataAccessModule).toBeDefined();
  });
});
