import {
  Component,
  ChangeDetectionStrategy,
  AfterViewInit
} from '@angular/core';
import { CodeHighlightService } from '@uqt/web/examples/code-highlight';
import { clone } from './guides.code';

@Component({
  selector: 'uqt-guides',
  templateUrl: './guides.component.html',
  styleUrls: ['./guides.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuidesComponent implements AfterViewInit {
  clone = clone;

  constructor(private highlight: CodeHighlightService) {}

  ngAfterViewInit() {
    this.highlight.highlightAll();
  }
}
