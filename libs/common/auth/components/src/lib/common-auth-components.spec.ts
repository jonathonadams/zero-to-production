import { async, TestBed } from '@angular/core/testing';
import { CommonAuthComponentsModule } from './common-auth-components.module';

describe('CommonAuthComponentsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonAuthComponentsModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CommonAuthComponentsModule).toBeDefined();
  });
});
