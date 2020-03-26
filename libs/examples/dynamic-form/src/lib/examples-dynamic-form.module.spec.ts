import { async, TestBed } from '@angular/core/testing';
import { ExamplesDynamicFormModule } from './examples-dynamic-form.module';

describe('ExamplesDynamicFormModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ExamplesDynamicFormModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ExamplesDynamicFormModule).toBeDefined();
  });
});
