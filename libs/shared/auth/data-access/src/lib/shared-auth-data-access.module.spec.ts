import { async, TestBed } from '@angular/core/testing';
import { SharedAuthDataAccessModule } from './shared-auth-data-access.module';

describe('DataAccessAuthModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedAuthDataAccessModule.forRoot()]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedAuthDataAccessModule).toBeDefined();
  });
});
