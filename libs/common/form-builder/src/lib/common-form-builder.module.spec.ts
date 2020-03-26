import { async, TestBed } from '@angular/core/testing';
import { CommonFormBuilderModule } from './common-form-builder.module';

describe('CommonFormBuilderModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonFormBuilderModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CommonFormBuilderModule).toBeDefined();
  });
});
