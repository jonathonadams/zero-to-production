import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterSkipLinkComponent } from './skip-link/skip-link.component';
import { SkipLinkDirective } from './skip-link/skip-link.directive';

// TODO -> Remove MatButton Module

@NgModule({
  imports: [MatButtonModule],
  declarations: [RouterSkipLinkComponent, SkipLinkDirective],
  exports: [RouterSkipLinkComponent, SkipLinkDirective],
})
export class CommonRouterModule {}
