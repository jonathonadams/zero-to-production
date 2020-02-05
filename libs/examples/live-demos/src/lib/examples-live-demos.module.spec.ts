import { async, TestBed } from '@angular/core/testing';
import { ExamplesLiveDemosModule } from './examples-live-demos.module';

describe('ExamplesLiveDemosModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ExamplesLiveDemosModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ExamplesLiveDemosModule).toBeDefined();
  });
});
