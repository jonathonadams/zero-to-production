import { NgModule } from '@angular/core';
import { LocalStorageService } from './local/local-storage.service';

@NgModule({
  providers: [LocalStorageService]
})
export class FrontendUtilsStorageModule {}
