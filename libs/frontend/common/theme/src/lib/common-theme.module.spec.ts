import { async, TestBed } from '@angular/core/testing';
import { CommonThemeModule } from './common-theme.module';

describe('CommonThemeModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonThemeModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CommonThemeModule).toBeDefined();
  });
});
