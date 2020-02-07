import { async, TestBed } from '@angular/core/testing';
import { ExamplesStartYourOwnModule } from './examples-start-your-own.module';

describe('ExamplesStartYourOwnModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ExamplesStartYourOwnModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ExamplesStartYourOwnModule).toBeDefined();
  });
});
