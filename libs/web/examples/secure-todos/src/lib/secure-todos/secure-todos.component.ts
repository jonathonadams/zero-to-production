import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'uqt-secure-todos',
  templateUrl: './secure-todos.component.html',
  styleUrls: ['./secure-todos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecureTodosComponent {
  constructor(private router: Router) {}

  navigateToDemos() {
    this.router.navigate(['examples', 'demos']);
  }

  navigateToAbout() {
    this.router.navigate(['about']);
  }
}
