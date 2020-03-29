import { async, TestBed } from '@angular/core/testing';
import { CommonGridModule } from './common-grid.module';

describe('CommonGridModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonGridModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CommonGridModule).toBeDefined();
  });
});
