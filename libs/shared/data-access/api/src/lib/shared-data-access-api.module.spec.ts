import { async, TestBed } from '@angular/core/testing';
import { SharedDataAccessApiModule } from './shared-data-access-api.module';

describe('SharedDataAccessApiModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedDataAccessApiModule.forRoot()],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedDataAccessApiModule).toBeDefined();
  });
});
