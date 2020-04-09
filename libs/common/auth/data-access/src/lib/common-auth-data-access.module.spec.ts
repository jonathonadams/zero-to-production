import { async, TestBed } from '@angular/core/testing';
import { CommonAuthDataAccessModule } from './common-auth-data-access.module';

describe('CommonAuthDataAccessModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonAuthDataAccessModule.forRoot()],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CommonAuthDataAccessModule).toBeDefined();
  });
});
