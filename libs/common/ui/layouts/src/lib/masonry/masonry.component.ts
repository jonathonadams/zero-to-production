import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ContentChild,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'layout-masonry',
  templateUrl: './masonry.component.html',
  styleUrls: ['./masonry.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MasonryComponent {
  @Input() columns: number | undefined;
  @Input() items: any[] | undefined | null;
  @Input() trackBy: any;
  @ContentChild('template') templateRef!: TemplateRef<any>;
}
