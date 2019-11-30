import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { CustomMaterialModule } from '@uqt/common/ui/custom-material';
import { CommonUiSideNavComponent } from './side-nav.component';
import {
  reducer,
  SideNavState,
  initialState
} from './+state/side-nave.reducer';
import { SideNavFacade } from './+state/side-nav.facade';
import { UiSideNavComponent } from './ui/ui-side-nav.component';

@NgModule({
  declarations: [CommonUiSideNavComponent, UiSideNavComponent],
  imports: [
    CommonModule,
    RouterModule,
    CustomMaterialModule,
    StoreModule.forFeature<SideNavState>('sideNavState', reducer, {
      initialState
    })
  ],
  providers: [SideNavFacade],
  exports: [CommonUiSideNavComponent]
})
export class CommonUiSideNavModule {}
