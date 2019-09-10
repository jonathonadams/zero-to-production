import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ngw-build',
  templateUrl: './build.component.html',
  styleUrls: ['./build.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuildComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
