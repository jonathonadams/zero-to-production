import { async, TestBed } from '@angular/core/testing';
import { SharedAuthComponentsModule } from './shared-auth-components.module';

describe('SharedAuthComponentsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedAuthComponentsModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedAuthComponentsModule).toBeDefined();
  });
});
