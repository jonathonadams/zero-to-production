import { async, TestBed } from '@angular/core/testing';
import { FrontendDataAccessServiceWorkerModule } from './frontend-data-access-service-worker.module';

describe('FrontendDataAccessServiceWorkerModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FrontendDataAccessServiceWorkerModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FrontendDataAccessServiceWorkerModule).toBeDefined();
  });
});
