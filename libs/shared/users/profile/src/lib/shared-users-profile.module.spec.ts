import { async, TestBed } from '@angular/core/testing';
import { SharedUsersProfileModule } from './shared-users-profile.module';

describe('SharedUsersProfileModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedUsersProfileModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedUsersProfileModule).toBeDefined();
  });
});
