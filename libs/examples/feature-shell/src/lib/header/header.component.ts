import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ztp-examples-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExamplesHeaderComponent {
  navRoutes = [
    { label: 'Home', link: '/home', aria: 'home' },
    { label: 'Examples', link: '/examples', aria: 'examples' },
    { label: 'Guides', link: '/guides', aria: 'guides' },
  ];
}
