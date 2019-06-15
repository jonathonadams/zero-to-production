import { Injectable } from '@angular/core';
import { MatSnackBarConfig, MatSnackBar } from '@angular/material';

@Injectable()
export class NotificationService {
  private config: MatSnackBarConfig;

  constructor(private snackBar: MatSnackBar) {
    this.config = new MatSnackBarConfig();
    this.config.duration = 4000;
    this.config.direction = 'ltr';
    this.config.horizontalPosition = 'center';
  }

  emit(notification: string, duration?: number) {
    const temp = { ...this.config, duration };
    this.snackBar.open(notification, 'Dismiss', temp);
  }
}
