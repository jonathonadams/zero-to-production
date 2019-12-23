import {
  Component,
  EventEmitter,
  Output,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input
} from '@angular/core';
import { IUser } from '@uqt/interfaces';

/**
 * For the purpose of themeing, view encapsulation has been set to none.
 * This element is only inserted into the overlay container,
 * the overlay container is a sibling of the app-root, not a child.
 * to prevent any styling clash, make sure to use unique class selectors for your components
 * eg do not use generic selectors life "container" etc
 */
@Component({
  selector: 'uqt-ui-drop-down-menu',
  templateUrl: './ui-drop-down-menu.component.html',
  styleUrls: ['./ui-drop-down-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class UiDropDownMenuComponent {
  @Input() user: IUser | null | undefined;
  @Output() toggleDarkMode = new EventEmitter<boolean>();
  @Output() logout = new EventEmitter<void>();
  @Output() navigateToProfile = new EventEmitter();
}
