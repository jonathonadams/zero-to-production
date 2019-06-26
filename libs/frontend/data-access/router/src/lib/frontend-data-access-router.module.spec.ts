import { async, TestBed } from '@angular/core/testing';
import { FrontendDataAccessRouterModule } from './frontend-data-access-router.module';

describe('FrontendDataAccessRouterModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FrontendDataAccessRouterModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FrontendDataAccessRouterModule).toBeDefined();
  });
});
