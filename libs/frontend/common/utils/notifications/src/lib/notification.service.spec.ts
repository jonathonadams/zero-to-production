import { TestBed } from '@angular/core/testing';
import { NotificationService } from './notification.service';
import { MatSnackBar } from '@angular/material';
import { createSpyObj } from '@workspace/frontend/utils/test-helpers';

describe('NotificationService', () => {
  let notificationService: NotificationService;
  let snackBarServiceSpy: any;
  const spy = createSpyObj('MatSnackBar', ['open']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationService, { provide: MatSnackBar, useValue: spy }]
    });
    notificationService = TestBed.get(NotificationService);
    snackBarServiceSpy = TestBed.get(MatSnackBar);
  });

  it('should be created', () => {
    expect(notificationService).toBeTruthy();
  });

  it('should use the snack bar service', () => {
    expect(snackBarServiceSpy).toBeTruthy();
  });

  describe('emit', () => {
    it('should open the snack bar', () => {
      notificationService.emit('test');
      expect(snackBarServiceSpy.open).toHaveBeenCalled();
    });
  });
});
