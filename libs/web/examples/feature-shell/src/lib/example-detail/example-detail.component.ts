import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ExamplesFacade } from '@ngw/examples/data-access';
import { Observable } from 'rxjs';
import { IExample } from '@ngw/types';

@Component({
  selector: 'ngw-example-detail',
  templateUrl: './example-detail.component.html',
  styleUrls: ['./example-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleDetailComponent {
  selectedExample$: Observable<IExample | undefined>;
  constructor(private facade: ExamplesFacade) {
    this.selectedExample$ = this.facade.selectedExample$;
  }
}
