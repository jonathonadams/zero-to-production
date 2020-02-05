import { async, TestBed } from '@angular/core/testing';
import { SharedUtilsDynamicModuleLoadingModule } from './shared-utils-dynamic-module-loading.module';

describe('SharedUtilsDynamicModuleLoadingModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedUtilsDynamicModuleLoadingModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedUtilsDynamicModuleLoadingModule).toBeDefined();
  });
});
