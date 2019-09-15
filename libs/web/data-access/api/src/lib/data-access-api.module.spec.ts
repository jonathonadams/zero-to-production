import { async, TestBed } from '@angular/core/testing';
import { DataAccessApiModule } from './data-access-api.module';

describe('DataAccessApiModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DataAccessApiModule.forRoot()]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(DataAccessApiModule).toBeDefined();
  });
});
