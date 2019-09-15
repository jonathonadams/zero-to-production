import { async, TestBed } from '@angular/core/testing';
import { DataAccessRouterModule } from './frontend-data-access-router.module';

describe('DataAccessRouterModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DataAccessRouterModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(DataAccessRouterModule).toBeDefined();
  });
});
