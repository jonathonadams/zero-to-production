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

  coolDown = false;
  // timer: NodeJS.Timeout;

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

        const position = this.elementScrollPosition(
          this.el,
          clientTop,
          clientHeight
        );

        if (position !== this.previousPosition) {
          if (position === ElementViewportPosition.On) {
            // if (!this.coolDown) {
            this.playAnimation(this.spinInto());

            // this.coolDown = true;
            // this.timer = setTimeout(() => (this.coolDown = false), 1000);
            // }
          } else {
            // this.playAnimation(this.shrinkBorder());
          }
        }
        this.previousPosition = position;
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
      style({
        height: '*'
      }),
      animate(
        `${timing}s ${delay}s ease-out`,
        keyframes([
          style({
            height: '*',
            opacity: 0,
            transform:
              'translate3d(0, 200%, -20em) scale3d(0.2, 0.2, 0.2) rotateX(720deg)'
          }),
          style({
            // height: '*',
            opacity: 0.25,
            transform:
              'translate3d(0, 120%, -18em) scale3d(0.4, 0.4, 0.4) rotateX(540deg)'
          }),
          style({
            // height: '*',
            opacity: 0.5,
            transform:
              'translate3d(0, 60%, -16em) scale3d(0.6, 0.6, 0.6) rotateX(360deg)'
          }),
          style({
            // height: '*',
            opacity: 0.75,
            transform:
              'translate3d(0, 20%, -10em) scale3d(0.8, 0.8, 0.8) rotateX(180deg)'
          }),
          style({
            // height: '*',
            opacity: 1,
            transform: 'none'
          })
        ])
      )
    ];
  }

  private shrinkBorder(): AnimationMetadata[] {
    return [
      style({ borderRadius: '4px' }),
      animate(
        '100ms ease',
        style({
          borderRadius: '50px'
        })
      )
    ];
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
