import { async, TestBed } from '@angular/core/testing';
import { CommonUiButtonsModule } from './common-ui-buttons.module';

describe('CommonUiButtonsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonUiButtonsModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CommonUiButtonsModule).toBeDefined();
  });
});
