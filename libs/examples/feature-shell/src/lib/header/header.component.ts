import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from '@ztp/common/theme';

@Component({
  selector: 'ztp-examples-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
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
