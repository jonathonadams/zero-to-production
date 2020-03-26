import { async, TestBed } from '@angular/core/testing';
import { CommonDynamicFormModule } from './common-dynamic-form.module';

describe('CommonDynamicFormModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonDynamicFormModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CommonDynamicFormModule).toBeDefined();
  });
});
