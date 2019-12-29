import { async, TestBed } from '@angular/core/testing';
import { WebCommonUiAuthModule } from './web-common-ui-auth.module';

describe('WebCommonUiAuthModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [WebCommonUiAuthModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(WebCommonUiAuthModule).toBeDefined();
  });
});
