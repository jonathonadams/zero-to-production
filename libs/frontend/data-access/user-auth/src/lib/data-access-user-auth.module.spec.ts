import { async, TestBed } from '@angular/core/testing';
import { DataAccessUserAuthModule } from './data-access-user-auth.module';

describe('DataAccessUserAuthModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DataAccessUserAuthModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(DataAccessUserAuthModule).toBeDefined();
  });
});
