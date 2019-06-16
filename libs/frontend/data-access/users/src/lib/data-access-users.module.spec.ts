import { async, TestBed } from '@angular/core/testing';
import { DataAccessUsersModule } from './data-access-users.module';

describe('DataAccessUsersModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DataAccessUsersModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(DataAccessUsersModule).toBeDefined();
  });
});
