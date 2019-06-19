import { NgModule } from '@angular/core';
import { NotificationService } from './notification.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  imports: [MatSnackBarModule],
  exports: [],
  providers: [NotificationService]
})
export class CommonNotificationModule {}
