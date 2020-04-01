import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ztp-examples-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExamplesHeaderComponent {
  navButtons = [
    { label: 'Home', link: '/' },
    { label: 'Examples', link: '/examples' },
    { label: 'Guides', link: '/guides' },
  ];
}
