import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ngw-ui-examples',
  templateUrl: './ui-examples.component.html',
  styleUrls: ['./ui-examples.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiExamplesComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
