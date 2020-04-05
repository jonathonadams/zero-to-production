import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterSkipLinkComponent } from './skip-link/skip-link.component';
import { SkipLinkDirective } from './skip-link/skip-link.directive';
import { CommonModule } from '@angular/common';

// TODO -> Remove MatButton Module

@NgModule({
  imports: [CommonModule, MatButtonModule],
  declarations: [RouterSkipLinkComponent, SkipLinkDirective],
  exports: [RouterSkipLinkComponent, SkipLinkDirective],
})
export class CommonRouterModule {}
