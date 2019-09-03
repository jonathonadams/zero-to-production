import { async, TestBed } from '@angular/core/testing';
import { FrontendSharedFormBuilderDataAccessModule } from './frontend-shared-form-builder-data-access.module';

describe('FrontendSharedFormBuilderDataAccessModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FrontendSharedFormBuilderDataAccessModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FrontendSharedFormBuilderDataAccessModule).toBeDefined();
  });
});
