import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { selectAllExamples, selectExampleEntities } from './examples.selectors';
import * as ExampleActions from './examples.actions';
import { IExample } from '../example.interface';
import { Dictionary } from '@ngrx/entity';

@Injectable()
export class ExamplesFacade {
  examples$: Observable<IExample[]>;
  entities$: Observable<Dictionary<IExample>>;

  constructor(private store: Store<any>) {
    this.examples$ = this.store.pipe(select(selectAllExamples));
    this.entities$ = this.store.pipe(select(selectExampleEntities));
  }

  selectExample(url: string): Observable<IExample | undefined> {
    return this.entities$.pipe(map(dictionary => dictionary[url]));
  }

  addExamples(examples: IExample[]): void {
    this.store.dispatch(ExampleActions.addExamples({ examples }));
  }
}
