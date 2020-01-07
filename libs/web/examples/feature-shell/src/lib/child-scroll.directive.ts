import { Directive, ElementRef } from '@angular/core';
import { ScrollDispatcher } from '@angular/cdk/overlay';

@Directive({
  selector: '[childScroll]'
})
export class ChildScrollDirective {
  constructor(
    private el: ElementRef,
    private scrollDispatcher: ScrollDispatcher
  ) {}

  ngOnInit() {
    this.scrollDispatcher.ancestorScrolled(this.el, 500).subscribe(scrolled => {
      if (scrolled) {
        console.log(scrolled.getElementRef());

        const clientTop = (scrolled.getElementRef()
          .nativeElement as HTMLElement).clientTop;
        const clientBottom = (scrolled.getElementRef()
          .nativeElement as HTMLElement).clientHeight;

        console.log(clientTop);
        console.log(clientBottom);

        console.log(this.isElementInViewport(this.el, clientTop, clientBottom));
      }
    });
  }

  isElementInViewport(el: ElementRef, topY: number, bottomY: number) {
    const rect: DOMRect = el.nativeElement.getBoundingClientRect();
    console.log(rect);
    return rect.top < bottomY && rect.bottom > topY;
  }
}
