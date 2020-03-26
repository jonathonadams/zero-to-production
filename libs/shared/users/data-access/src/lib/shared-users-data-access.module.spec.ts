import { async, TestBed } from '@angular/core/testing';
import { SharedUsersDataAccessModule } from './shared-users-data-access.module';

describe('SharedUsersDataAccessModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedUsersDataAccessModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedUsersDataAccessModule).toBeDefined();
  });
});
