import { async, TestBed } from '@angular/core/testing';
import { FormBuilderCreateModule } from './shared-form-builder-create.module';

describe('FormBuilderCreateModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormBuilderCreateModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FormBuilderCreateModule).toBeDefined();
  });
});
