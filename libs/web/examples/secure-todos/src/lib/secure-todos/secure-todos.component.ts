import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'uqt-secure-todos',
  templateUrl: './secure-todos.component.html',
  styleUrls: ['./secure-todos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecureTodosComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
