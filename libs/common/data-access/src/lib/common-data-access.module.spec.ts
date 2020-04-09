import { async, TestBed } from '@angular/core/testing';
import { CommonDataAccessModule } from './common-data-access.module';

describe('CommonDataAccessModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonDataAccessModule.forRoot()],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CommonDataAccessModule).toBeDefined();
  });
});
