import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';
import {
  AnimationBuilder,
  AnimationPlayer,
  AnimationMetadata,
  style,
  animate,
} from '@angular/animations';

@Directive({
  selector: '[uqt-raised-button]',
})
export class RaisedButtonDirective implements OnInit {
  player: AnimationPlayer;

  constructor(private builder: AnimationBuilder, private el: ElementRef) {}

  ngOnInit() {
    this.el.nativeElement.style.padding = '5px';
    this.el.nativeElement.style.border = '2px solid';
    this.el.nativeElement.style.textTransform = 'uppercase';
    this.el.nativeElement.style.textDecoration = 'none';
    this.el.nativeElement.style.display = 'inline-block';
    this.el.nativeElement.style.borderRadius = '4px';
    this.el.nativeElement.style.cursor = 'pointer';
    this.el.nativeElement.style.background = 'none';
  }

  @HostListener('mouseover')
  onMouseOver() {
    const metadata = this.shrinkBorder();
    this.playAnimation(metadata);
  }

  @HostListener('mouseout')
  onMouseOut() {
    const metadata = this.expandBorder();
    this.playAnimation(metadata);
  }

  private playAnimation(metadata: AnimationMetadata[]) {
    if (this.player) {
      this.player.destroy();
    }

    const factory = this.builder.build(metadata);
    this.player = factory.create(this.el.nativeElement);

    this.player.play();
  }

  private shrinkBorder(): AnimationMetadata[] {
    return [
      style({ borderRadius: '4px' }),
      animate(
        '100ms ease',
        style({
          borderRadius: '50px',
        })
      ),
    ];
  }

  private expandBorder(): AnimationMetadata[] {
    return [
      style({ borderRadius: '50px' }),
      animate(
        '100ms ease',
        style({
          borderRadius: '4px',
        })
      ),
    ];
  }
}
