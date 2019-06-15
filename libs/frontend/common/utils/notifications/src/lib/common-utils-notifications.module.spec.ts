import { async, TestBed } from '@angular/core/testing';
import { CommonNotificationModule } from './common-utils-notifications.module';

describe('CommonNotificationModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonNotificationModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CommonNotificationModule).toBeDefined();
  });
});
