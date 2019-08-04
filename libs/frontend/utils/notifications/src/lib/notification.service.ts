import { Injectable } from '@angular/core';
import { MatSnackBarConfig, MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class NotificationService {
  private config: MatSnackBarConfig;

  constructor(private snackBar: MatSnackBar) {
    this.config = new MatSnackBarConfig();
    this.config.duration = 4000;
    this.config.direction = 'ltr';
    this.config.horizontalPosition = 'center';
  }

  emit(message: string, duration?: number) {
    const tempConfig = { ...this.config };
    if (duration) {
      tempConfig.duration = duration;
    }
    this.snackBar.open(message, 'Dismiss', tempConfig);
  }
}
