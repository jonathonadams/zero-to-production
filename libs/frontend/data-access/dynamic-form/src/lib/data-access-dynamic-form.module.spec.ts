import { async, TestBed } from '@angular/core/testing';
import { DataAccessDynamicFormModule } from './data-access-dynamic-form.module';

describe('DataAccessDynamicFormModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DataAccessDynamicFormModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(DataAccessDynamicFormModule).toBeDefined();
  });
});
