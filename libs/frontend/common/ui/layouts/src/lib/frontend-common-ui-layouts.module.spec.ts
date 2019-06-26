import { async, TestBed } from '@angular/core/testing';
import { CommonUiLayoutsModule } from './frontend-common-ui-layouts.module';

describe('CommonUiLayoutsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonUiLayoutsModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CommonUiLayoutsModule).toBeDefined();
  });
});
