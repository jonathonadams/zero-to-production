import { async, TestBed } from '@angular/core/testing';
import { CommonUtilsNotificationModule } from './common-utils-notification.module';

describe('CommonUtilsNotificationModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonUtilsNotificationModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CommonUtilsNotificationModule).toBeDefined();
  });
});
