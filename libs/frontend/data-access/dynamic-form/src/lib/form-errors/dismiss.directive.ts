import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appDismiss]'
})
export class DismissDirective {
  @Output() dismiss = new EventEmitter();

  @HostListener('window:click')
  onClick() {
    this.dismiss.next();
  }

  @HostListener('window:keyup')
  onKeyup() {
    this.dismiss.next();
  }
}
