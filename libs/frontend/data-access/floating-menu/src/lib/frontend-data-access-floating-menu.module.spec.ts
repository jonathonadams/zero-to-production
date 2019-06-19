import { async, TestBed } from '@angular/core/testing';
import { DataAccessFloatingMenuModule } from './frontend-data-access-floating-menu.module';

describe('DataAccessFloatingMenuModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DataAccessFloatingMenuModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(DataAccessFloatingMenuModule).toBeDefined();
  });
});
