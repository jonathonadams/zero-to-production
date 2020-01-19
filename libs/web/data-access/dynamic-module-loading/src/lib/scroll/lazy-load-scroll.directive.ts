import {
  Directive,
  HostListener,
  Output,
  EventEmitter,
  Input,
  ElementRef,
  QueryList,
  ContentChildren
} from '@angular/core';

// UQT_UPDATE
// support for the api, remove the polyfill
// https://github.com/Microsoft/TypeScript/issues/28502
// https://caniuse.com/#search=Resize%20Observer
import ResizeObserver from 'resize-observer-polyfill';

@Directive({
  selector: '[lazyLoadScroll]'
})
export class LazyLoadScrollDirective {
  private ro: ResizeObserver | undefined;
  private index = 1;
  private initLoad: boolean;

  /**
   * @required
   */
  @Input() modules: number | undefined;
  @Input() loadThreshold: number | undefined; // pixels until next load
  @Output() loadIndex = new EventEmitter<number>();

  @ContentChildren('lazyItem') children: QueryList<ElementRef>;

  ngOnInit() {
    // load the first element when first loading
    this.loadIndex.emit(0);

    // The ResizeObserver will fire every time one of the observed elements changes size
    // this can be from changes in screen dimensions, orientation or by dynamically adding elements.
    // we don't care about anything other than the fact the dimensions have changed, normally
    // from a lazy loaded component being inserted. It is still the scroll that will cause the
    // loading of the next module
    this.ro = new ResizeObserver(entries => {
      this.initLoad = false;
    });
  }

  ngAfterViewInit() {
    // Observer each of hte children
    this.children.forEach(child =>
      (this.ro as ResizeObserver).observe(child.nativeElement)
    );
  }

  /**
   * On each scroll event, we determine how many pixels from the bottom of the scroll
   * container you are. If we are less than the load threshold, emit the loadIndex event,
   * and the resize observer will reset the initLoad flag once the content has been loaded
   * and inserted into the scroll container
   *
   * @param event
   */
  @HostListener('scroll', ['$event'])
  scroll(event: Event) {
    if (this.modules) {
      // pixelsFromBottom = totalHeight - clientHeight - scrollTopPosition;
      const totalHeight = (event.target as HTMLElement).scrollHeight;
      const scrollTopPosition = (event.target as HTMLElement).scrollTop;
      const clientHeight = (event.target as HTMLElement).clientHeight;

      const pixelsFromBottom = totalHeight - clientHeight - scrollTopPosition;

      if (
        !this.initLoad &&
        pixelsFromBottom < (this.loadThreshold || 500) && // default 400 px
        this.index <= this.modules - 1
      ) {
        this.loadIndex.emit(this.index);
        this.index++;
        this.initLoad = true;
      }
    }
  }

  ngOnDestroy() {
    (this.ro as ResizeObserver).disconnect();
  }
}
