import { async, TestBed } from '@angular/core/testing';
import { FrontendCommonUiLayoutsModule } from './frontend-common-ui-layouts.module';

describe('FrontendCommonUiLayoutsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FrontendCommonUiLayoutsModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FrontendCommonUiLayoutsModule).toBeDefined();
  });
});
