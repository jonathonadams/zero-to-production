import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from '@uqt/common/theme';

@Component({
  selector: 'uqt-examples-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExamplesHeaderComponent {
  darkTheme$: Observable<boolean>;

  constructor(private theme: ThemeService) {
    this.darkTheme$ = this.theme.darkTheme$;
  }

  navButtons = [
    { label: 'Home', link: '/' },
    { label: 'Examples', link: '/examples' },
    { label: 'Guides', link: '/guides' },
  ];
}
