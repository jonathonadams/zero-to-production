import { async, TestBed } from '@angular/core/testing';
import { SharedUtilsOverlayModule } from './shared-utils-overlay.module';

describe('SharedUtilsOverlayModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedUtilsOverlayModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedUtilsOverlayModule).toBeDefined();
  });
});
