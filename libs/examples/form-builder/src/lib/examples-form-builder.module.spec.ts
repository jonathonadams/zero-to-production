import { async, TestBed } from '@angular/core/testing';
import { ExamplesFormBuilderModule } from './examples-form-builder.module';

describe('ExamplesFormBuilderModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ExamplesFormBuilderModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ExamplesFormBuilderModule).toBeDefined();
  });
});
