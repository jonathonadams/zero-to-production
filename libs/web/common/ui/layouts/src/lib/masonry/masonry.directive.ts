import {
  Directive,
  Input,
  ElementRef,
  QueryList,
  ContentChildren,
  AfterContentChecked
} from '@angular/core';

@Directive({
  selector: '[masonryLayout]'
})
export class MasonryLayoutDirective implements AfterContentChecked {
  @Input() columns!: number;
  @ContentChildren('blocks') blocks!: QueryList<ElementRef<HTMLElement>>;

  constructor(private el: ElementRef) {}

  ngAfterContentChecked() {
    if (this.blocks) {
      const colHeights = Array(this.blocks.length).fill(0);

      this.blocks.forEach((block, idx) => {
        var order = (idx + 1) % this.columns || this.columns;

        block.nativeElement.style.order = order as any;
        colHeights[order] += parseFloat(block.nativeElement
          .offsetHeight as any);
      });

      const highestColumn = Math.max.apply(Math, colHeights);
      this.el.nativeElement.style.height = highestColumn + 'px';
    }
  }
}
