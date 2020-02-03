import { async, TestBed } from '@angular/core/testing';
import { SharedDataAccessAuthModule } from './shared-data-access-auth.module';

describe('DataAccessAuthModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedDataAccessAuthModule.forRoot()]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedDataAccessAuthModule).toBeDefined();
  });
});
