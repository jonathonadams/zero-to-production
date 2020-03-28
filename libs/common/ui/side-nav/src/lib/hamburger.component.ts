import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
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
}
