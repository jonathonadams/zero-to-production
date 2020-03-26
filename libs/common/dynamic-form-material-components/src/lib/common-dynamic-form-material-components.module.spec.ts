import { async, TestBed } from '@angular/core/testing';
import { CommonDynamicFormMaterialComponentsModule } from './common-dynamic-form-material-components.module';

describe('CommonDynamicFormMaterialComponentsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonDynamicFormMaterialComponentsModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CommonDynamicFormMaterialComponentsModule).toBeDefined();
  });
});
