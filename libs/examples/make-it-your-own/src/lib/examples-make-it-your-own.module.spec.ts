import { async, TestBed } from '@angular/core/testing';
import { ExamplesMakeItYourOwnModule } from './examples-make-it-your-own.module';

describe('ExamplesMakeItYourOwnModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ExamplesMakeItYourOwnModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ExamplesMakeItYourOwnModule).toBeDefined();
  });
});
