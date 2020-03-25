import { async, TestBed } from '@angular/core/testing';
import { ExamplesLazyLoadScrollingModule } from './examples-lazy-load-scrolling.module';

describe('ExamplesLazyLoadScrollingModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ExamplesLazyLoadScrollingModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ExamplesLazyLoadScrollingModule).toBeDefined();
  });
});
