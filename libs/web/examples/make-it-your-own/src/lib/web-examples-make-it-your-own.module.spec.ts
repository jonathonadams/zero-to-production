import { async, TestBed } from '@angular/core/testing';
import { WebExamplesMakeItYourOwnModule } from './web-examples-make-it-your-own.module';

describe('WebExamplesMakeItYourOwnModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [WebExamplesMakeItYourOwnModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(WebExamplesMakeItYourOwnModule).toBeDefined();
  });
});
