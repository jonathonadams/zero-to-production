import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';

// All credit goes to
// https://jonsuh.com/hamburgers/

@Component({
  selector: 'ztp-sidenav-hamburger',
  templateUrl: './hamburger.component.html',
  styleUrls: ['./hamburger.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HamburgerComponent {
  @Input() isOpen = false;
  @Output() toggle = new EventEmitter<boolean>();
  @ViewChild('burger', { static: true }) button: ElementRef<HTMLElement>;

  focus() {
    this.button.nativeElement.focus();
  }
}
