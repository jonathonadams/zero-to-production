import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[icon-button]'
})
export class IconButtonDirective {
  constructor(private el: ElementRef) {
    this.el.nativeElement.style.background = 'none';
    this.el.nativeElement.style.border = 'none';
    this.el.nativeElement.style.cursor = 'pointer';
  }
}
