import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
  ViewChild,
  ElementRef,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Subscription, fromEvent } from 'rxjs';
import { debounceTime, map, distinctUntilChanged } from 'rxjs/operators';
import { TodoFilterStatus } from '@ztp/todos/data-access';
import { ANIMATE_CLASS } from '@ztp/common/animations';

@Component({
  selector: 'todo-ui-filter-todos',
  templateUrl: './ui-filter-todos.component.html',
  styleUrls: ['./ui-filter-todos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiFilterTodosComponent implements OnInit, OnDestroy {
  animate = ANIMATE_CLASS;
  sub: Subscription | undefined;

  @Input()
  status: TodoFilterStatus | null | undefined;
  @Input()
  options: { display: string; value: TodoFilterStatus }[] | undefined;
  @Output()
  statusChanged = new EventEmitter<MatSelectChange>();
  @Output()
  searchChanged = new EventEmitter<string>();

  @ViewChild('todoSearch', { static: true }) input: ElementRef<
    HTMLInputElement
  >;

  ngOnInit() {
    this.sub = fromEvent<KeyboardEvent>(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(100),
        map((event) => (event.target as HTMLInputElement).value),
        distinctUntilChanged()
      )
      .subscribe((search) => {
        this.searchChanged.emit(search);
      });
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }
}
