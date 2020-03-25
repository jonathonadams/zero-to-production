import {
  Directive,
  Input,
  ElementRef,
  QueryList,
  ContentChildren,
  AfterContentChecked,
} from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Directive({
  selector: '[layoutMasonry]',
})
export class MasonryLayoutDirective implements AfterContentChecked {
  @Input() columns: number | undefined;
  @ContentChildren('blocks') blocks!: QueryList<ElementRef<HTMLElement>>;

  constructor(private el: ElementRef, breakPointObserver: BreakpointObserver) {}

  ngAfterContentChecked() {
    const blocks = this.blocks;
    const columns = this.columns;
    if (blocks && columns) {
      const colHeights = Array(blocks.length).fill(0);

      blocks.forEach((block, idx) => {
        const order = (idx + 1) % columns || columns;

        block.nativeElement.style.order = order as any;
        colHeights[order] += parseFloat(
          block.nativeElement.offsetHeight as any
        );
      });

      const highestColumn = Math.max.apply(Math, colHeights);
      this.el.nativeElement.style.height = highestColumn + 'px';
    }
  }
}
