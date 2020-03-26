import { async, TestBed } from '@angular/core/testing';
import { SharedDashboardModule } from './shared-dashboard.module';

describe('SharedDashboardModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedDashboardModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedDashboardModule).toBeDefined();
  });
});
