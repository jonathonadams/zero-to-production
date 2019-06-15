import { NgModule } from '@angular/core';
import { NotificationService } from './notification.service';
import { MatSnackBarModule } from '@angular/material';

@NgModule({
  imports: [MatSnackBarModule],
  exports: [],
  providers: [NotificationService]
})
export class CommonNotificationModule {}
