import { async, TestBed } from '@angular/core/testing';
import { SharedUtilsNotificationModule } from './shared-utils-notification.module';

describe('SharedUtilsNotificationModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedUtilsNotificationModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedUtilsNotificationModule).toBeDefined();
  });
});
