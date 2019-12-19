import { async, TestBed } from '@angular/core/testing';
import { WebExamplesLazyLoadScrollingModule } from './web-examples-lazy-load-scrolling.module';

describe('WebExamplesLazyLoadScrollingModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [WebExamplesLazyLoadScrollingModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(WebExamplesLazyLoadScrollingModule).toBeDefined();
  });
});
