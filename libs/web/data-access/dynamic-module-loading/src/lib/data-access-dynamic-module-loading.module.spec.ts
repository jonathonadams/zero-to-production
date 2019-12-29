import { async, TestBed } from '@angular/core/testing';
import { DataAccessDynamicModuleLoadingModule } from './data-access-dynamic-module-loading.module';

describe('DataAccessDynamicModuleLoadingModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DataAccessDynamicModuleLoadingModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(DataAccessDynamicModuleLoadingModule).toBeDefined();
  });
});
