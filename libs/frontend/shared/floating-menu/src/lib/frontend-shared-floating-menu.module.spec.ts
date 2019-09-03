import { async, TestBed } from '@angular/core/testing';
import { SharedFloatingMenuModule } from './frontend-shared-floating-menu.module';

describe('SharedFloatingMenuModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedFloatingMenuModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedFloatingMenuModule).toBeDefined();
  });
});
