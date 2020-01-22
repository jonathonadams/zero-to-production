import { async, TestBed } from '@angular/core/testing';
import { WebExamplesLiveDemosModule } from './web-examples-live-demos.module';

describe('WebExamplesLiveDemosModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [WebExamplesLiveDemosModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(WebExamplesLiveDemosModule).toBeDefined();
  });
});
