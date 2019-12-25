import {
  Directive,
  HostListener,
  Output,
  EventEmitter,
  Input
} from '@angular/core';

@Directive({
  selector: '[lazyLoadScroll]'
})
export class LazyLoadScrollDirective {
  private index = 1;
  currentSize: number;
  initLoadNext: boolean;

  @Input() modules: number | undefined;
  @Output() loadIndex = new EventEmitter<number>();

  @HostListener('scroll', ['$event'])
  scroll(event: Event) {
    if (this.modules) {
      // pixelsFromBottom = totalHeight - clientHeight - scrollTopPosition;
      const totalHeight = (event.target as HTMLElement).scrollHeight;
      const scrollTopPosition = (event.target as HTMLElement).scrollTop;
      const clientHeight = (event.target as HTMLElement).clientHeight;

      const pixelsFromBottom = totalHeight - clientHeight - scrollTopPosition;

      // On first scroll, it will be undefined, so set it to the current total height
      if (!this.currentSize) this.currentSize = totalHeight;

      if (totalHeight === this.currentSize) {
        if (
          !this.initLoadNext &&
          pixelsFromBottom < 400 &&
          this.index <= this.modules - 1
        ) {
          this.loadIndex.emit(this.index);
          this.initLoadNext = true;
        }
      } else {
        // If they are different, then a module has just been loaded and reset everything
        this.initLoadNext = false;
        this.index++;
        this.currentSize = totalHeight;
      }
    }
  }
}
