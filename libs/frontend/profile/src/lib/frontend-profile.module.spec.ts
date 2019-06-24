import { async, TestBed } from '@angular/core/testing';
import { FrontendProfileModule } from './frontend-profile.module';

describe('FrontendProfileModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FrontendProfileModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FrontendProfileModule).toBeDefined();
  });
});
