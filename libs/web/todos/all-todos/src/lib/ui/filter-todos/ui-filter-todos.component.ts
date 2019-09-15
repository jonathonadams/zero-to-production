import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
  ViewChild,
  ElementRef,
  OnDestroy,
  OnInit
} from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Subscription, fromEvent } from 'rxjs';
import { debounceTime, map, distinctUntilChanged } from 'rxjs/operators';
import { TodoFilterStatus } from '@ngw/enums';

@Component({
  selector: 'todo-ui-filter-todos',
  templateUrl: './ui-filter-todos.component.html',
  styleUrls: ['./ui-filter-todos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiFilterTodosComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  @Input()
  todoFilter: TodoFilterStatus | undefined;
  @Input()
  filterOptions: { display: string; value: TodoFilterStatus }[] | undefined;
  @Output()
  selectFilterChanged = new EventEmitter<MatSelectChange>();
  @Output()
  searchStringChanged = new EventEmitter<string>();

  @ViewChild('todoSearch', { static: true }) searchInput!: ElementRef<
    HTMLInputElement
  >;

  ngOnInit() {
    this.subscription = fromEvent<KeyboardEvent>(
      this.searchInput.nativeElement,
      'keyup'
    )
      .pipe(
        debounceTime(100),
        map((event: KeyboardEvent) => (<HTMLInputElement>event.target).value),
        distinctUntilChanged()
      )
      .subscribe(searchString => {
        this.searchStringChanged.emit(searchString);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
