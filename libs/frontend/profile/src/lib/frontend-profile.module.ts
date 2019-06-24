import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UiUserProfileComponent } from './ui-user-profile/ui-user-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from '@workspace/common/ui/custom-material';
import { FrontendProfileRouterModule } from './frontend-profile-routing.module';
import { CommonThemeModule } from '@workspace/frontend/common/theme';

@NgModule({
  imports: [
    CommonModule,
    FrontendProfileRouterModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    CommonThemeModule
  ],
  declarations: [UserProfileComponent, UiUserProfileComponent]
})
export class FrontendProfileModule {}
