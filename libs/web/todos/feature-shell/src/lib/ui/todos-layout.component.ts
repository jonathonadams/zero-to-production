import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'todo-layout',
  templateUrl: './todos-layout.component.html',
  styleUrls: ['./todos-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoLayoutComponent {}
