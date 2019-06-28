import { NgModule } from '@angular/core';
import { DataAccessUsersModule } from '@workspace/frontend/data-access/users';
import { ThemeService } from './theme.service';
import { UserThemeService } from './user-theme.service';

@NgModule({
  imports: [DataAccessUsersModule],
  providers: [ThemeService, UserThemeService]
})
export class CommonThemeModule {}
