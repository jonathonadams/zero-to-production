import {
  Component,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { ToolbarService } from './toolbar.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'todo-ui-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommonUiToolbarComponent {
  visible$: Observable<boolean>;
  @Output() navToggle = new EventEmitter<void>();

  constructor(private toolbarService: ToolbarService) {
    this.visible$ = this.toolbarService.visible$;
  }
}
