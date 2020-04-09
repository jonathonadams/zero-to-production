import { async, TestBed } from '@angular/core/testing';
import { CommonUtilsDynamicModuleLoadingModule } from './common-utils-dynamic-module-loading.module';

describe('CommonUtilsDynamicModuleLoadingModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonUtilsDynamicModuleLoadingModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CommonUtilsDynamicModuleLoadingModule).toBeDefined();
  });
});
