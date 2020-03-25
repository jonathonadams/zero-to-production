import { async, TestBed } from '@angular/core/testing';
import { ExamplesGuidesModule } from './examples-guides.module';

describe('ExamplesGuidesModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ExamplesGuidesModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ExamplesGuidesModule).toBeDefined();
  });
});
