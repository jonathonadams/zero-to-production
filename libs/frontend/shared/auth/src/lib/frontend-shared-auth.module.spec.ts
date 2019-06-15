import { async, TestBed } from '@angular/core/testing';
import { FrontendSharedAuthModule } from './frontend-shared-auth.module';

describe('FrontendSharedAuth2Module', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FrontendSharedAuthModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FrontendSharedAuthModule).toBeDefined();
  });
});
