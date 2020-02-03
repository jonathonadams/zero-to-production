import { async, TestBed } from '@angular/core/testing';
import { CommonUiToolbarMenuModule } from './common-ui-toolbar-menu.module';

describe('CommonUiToolbarMenuModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonUiToolbarMenuModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CommonUiToolbarMenuModule).toBeDefined();
  });
});
