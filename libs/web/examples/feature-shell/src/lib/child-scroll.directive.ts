import { Directive, ElementRef, Input } from '@angular/core';
import { ScrollDispatcher } from '@angular/cdk/overlay';
import {
  AnimationPlayer,
  AnimationMetadata,
  AnimationBuilder,
  style,
  animate,
  keyframes
} from '@angular/animations';

export enum ElementViewportPosition {
  Above = 'Above',
  On = 'On',
  Below = 'Below'
}

@Directive({
  selector: '[childScroll]'
})
export class ChildScrollDirective {
  player: AnimationPlayer;
  previousPosition: ElementViewportPosition;

  constructor(
    private el: ElementRef,
    private builder: AnimationBuilder,
    private scrollDispatcher: ScrollDispatcher
  ) {}

  ngOnInit() {
    this.scrollDispatcher.ancestorScrolled(this.el, 200).subscribe(scrolled => {
      if (scrolled) {
        const elRef = scrolled.getElementRef().nativeElement as HTMLElement;

        const clientTop = elRef.clientTop;
        const clientHeight = elRef.clientHeight;

        const newPosition = this.elementScrollPosition(
          this.el,
          clientTop,
          clientHeight
        );

        const oldPosition = this.previousPosition;

        if (
          (oldPosition === ElementViewportPosition.Below || !oldPosition) &&
          newPosition === ElementViewportPosition.On
        ) {
          this.playAnimation(this.spinInto());
        } else if (
          oldPosition === ElementViewportPosition.On &&
          newPosition === ElementViewportPosition.Below
        ) {
          this.playAnimation(this.hide());
        }

        this.previousPosition = newPosition;
      }
    });
  }

  private playAnimation(metadata: AnimationMetadata[]) {
    if (this.player) {
      this.player.destroy();
    }

    const factory = this.builder.build(metadata);
    this.player = factory.create(this.el.nativeElement);

    this.player.play();
  }

  private spinInto(): AnimationMetadata[] {
    // sudo random number between 0 and 0.5
    const delay = Math.random().toFixed(2);
    const timing = (0.5 + Math.random()).toFixed(2);
    return [
      animate(
        `${timing}s ${delay}s ease-out`,
        keyframes([
          style({
            opacity: 0,
            transform:
              'translate3d(0, 200%, -20em) scale3d(0.2, 0.2, 0.2) rotateX(720deg)'
          }),
          style({
            opacity: 0.25,
            transform:
              'translate3d(0, 120%, -18em) scale3d(0.4, 0.4, 0.4) rotateX(540deg)'
          }),
          style({
            opacity: 0.5,
            transform:
              'translate3d(0, 60%, -16em) scale3d(0.6, 0.6, 0.6) rotateX(360deg)'
          }),
          style({
            opacity: 0.75,
            transform:
              'translate3d(0, 20%, -10em) scale3d(0.8, 0.8, 0.8) rotateX(180deg)'
          }),
          style({
            opacity: 1,
            transform: 'none'
          })
        ])
      )
    ];
  }

  private hide(): AnimationMetadata[] {
    return [style({ opacity: 0 })];
  }

  elementScrollPosition(
    el: ElementRef,
    topY: number,
    bottomY: number
  ): ElementViewportPosition {
    const rect: DOMRect = el.nativeElement.getBoundingClientRect();
    if (rect.top < bottomY && rect.bottom > topY) {
      return ElementViewportPosition.On;
    } else if (rect.top > bottomY && rect.bottom > topY) {
      return ElementViewportPosition.Below;
    } else {
      return ElementViewportPosition.Above;
    }
  }
}
