import { async, TestBed } from '@angular/core/testing';
import { FrontendUtilsStorageModule } from './frontend-utils-storage.module';

describe('FrontendUtilsStorageModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FrontendUtilsStorageModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FrontendUtilsStorageModule).toBeDefined();
  });
});
