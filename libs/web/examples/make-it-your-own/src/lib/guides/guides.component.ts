import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'uqt-guides',
  templateUrl: './guides.component.html',
  styleUrls: ['./guides.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuidesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
