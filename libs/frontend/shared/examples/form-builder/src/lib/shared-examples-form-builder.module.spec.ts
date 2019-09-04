import { async, TestBed } from '@angular/core/testing';
import { SharedExamplesFormBuilderModule } from './shared-examples-form-builder.module';

describe('SharedExamplesFormBuilderModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedExamplesFormBuilderModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedExamplesFormBuilderModule).toBeDefined();
  });
});
