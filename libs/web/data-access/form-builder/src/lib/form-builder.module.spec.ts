import { async, TestBed } from '@angular/core/testing';
import { DataAccessFormBuilderModule } from './form-builder.module';

describe('FrontendDataAccessFormBuilderModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DataAccessFormBuilderModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(DataAccessFormBuilderModule).toBeDefined();
  });
});
