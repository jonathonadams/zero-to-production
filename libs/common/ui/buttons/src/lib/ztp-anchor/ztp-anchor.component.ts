import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'a[ztp-anchor]',
  exportAs: 'ztpAnchor',
  templateUrl: './ztp-anchor.component.html',
  styleUrls: ['./ztp-anchor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZtpAnchorComponent {
  constructor(private el: ElementRef) {}
  @Input()
  set active(active: boolean) {
    if (active) {
      this.el.nativeElement.classList.add('active');
    } else {
      this.el.nativeElement.classList.remove('active');
    }
  }
}
