import { async, TestBed } from '@angular/core/testing';
import { CommonUtilsErrorsModule } from './common-utils-errors.module';

describe('CommonUtilsErrorsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonUtilsErrorsModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CommonUtilsErrorsModule).toBeDefined();
  });
});
