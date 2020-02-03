import { async, TestBed } from '@angular/core/testing';
import { CommonUiAuthModule } from './common-ui-auth.module';

describe('CommonUiAuthModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonUiAuthModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CommonUiAuthModule).toBeDefined();
  });
});
