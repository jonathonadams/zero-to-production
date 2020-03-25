import { async, TestBed } from '@angular/core/testing';
import { SharedUtilsStorageModule } from './shared-utils-storage.module';

describe('SharedUtilsStorageModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedUtilsStorageModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedUtilsStorageModule).toBeDefined();
  });
});
