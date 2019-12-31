import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'uqt-example-todos',
  templateUrl: './example-todos.component.html',
  styleUrls: ['./example-todos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleTodosComponent {
  constructor(private router: Router) {}

  showTodos() {
    this.router.navigate(['examples', 'demos', 'secure']);
  }
}
