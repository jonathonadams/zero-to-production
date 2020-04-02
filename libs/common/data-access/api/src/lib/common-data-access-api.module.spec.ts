import { async, TestBed } from '@angular/core/testing';
import { CommonDataAccessApiModule } from './common-data-access-api.module';

describe('CommonDataAccessApiModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonDataAccessApiModule.forRoot()],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CommonDataAccessApiModule).toBeDefined();
  });
});
