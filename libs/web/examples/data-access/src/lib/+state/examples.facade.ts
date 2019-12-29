import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { selectAllExamples } from './examples.selectors';
import * as ExampleActions from './examples.actions';
import { IExample } from '../example.interface';

@Injectable()
export class ExamplesFacade {
  examples$: Observable<IExample[]>;

  constructor(private store: Store<any>) {
    this.examples$ = this.store.pipe(select(selectAllExamples));
  }

  addExamples(examples: IExample[]): void {
    this.store.dispatch(ExampleActions.addExamples({ examples }));
  }
}
