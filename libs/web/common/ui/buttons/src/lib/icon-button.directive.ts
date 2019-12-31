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

  // ngAfterViewInit() {
  //   const height = this.el.nativeElement.offsetHeight;
  //   const width = this.el.nativeElement.offsetWidth;
  //   if (height > width) {
  //     this.el.nativeElement.style.width = `${height}px`;
  //   } else {
  //     this.el.nativeElement.style.height = `${width}px`;
  //   }
  //   this.el.nativeElement.style.borderRadius = `${height}px`;
  // }
}
