import { async, TestBed } from '@angular/core/testing';
import { WebExamplesThemingModule } from './web-examples-theming.module';

describe('WebExamplesThemingModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [WebExamplesThemingModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(WebExamplesThemingModule).toBeDefined();
  });
});
