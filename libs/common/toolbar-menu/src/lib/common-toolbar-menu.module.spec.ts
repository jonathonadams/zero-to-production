import { async, TestBed } from '@angular/core/testing';
import { CommonToolbarMenuModule } from './common-toolbar-menu.module';

describe('CommonToolbarMenuModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonToolbarMenuModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CommonToolbarMenuModule).toBeDefined();
  });
});
