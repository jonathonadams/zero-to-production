import { async, TestBed } from '@angular/core/testing';
import { CommonUtilsOverlayModule } from './common-utils-overlay.module';

describe('CommonUtilsOverlayModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonUtilsOverlayModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CommonUtilsOverlayModule).toBeDefined();
  });
});
