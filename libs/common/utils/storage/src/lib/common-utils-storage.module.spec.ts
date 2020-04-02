import { async, TestBed } from '@angular/core/testing';
import { CommonUtilsStorageModule } from './common-utils-storage.module';

describe('CommonUtilsStorageModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonUtilsStorageModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CommonUtilsStorageModule).toBeDefined();
  });
});
