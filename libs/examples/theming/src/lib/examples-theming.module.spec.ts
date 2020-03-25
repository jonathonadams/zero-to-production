import { async, TestBed } from '@angular/core/testing';
import { ExamplesThemingModule } from './examples-theming.module';

describe('ExamplesThemingModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ExamplesThemingModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ExamplesThemingModule).toBeDefined();
  });
});
