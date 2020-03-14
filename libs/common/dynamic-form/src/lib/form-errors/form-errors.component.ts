import {
  Component,
  ChangeDetectionStrategy,
  OnDestroy,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import { timer, Observable, Subscription } from 'rxjs';
import { formErrorsAnimations } from './form-errors.animations';
import { PrivateDynamicFormFacade } from '../+state/private-dynamic-form.facade';
import { first, map } from 'rxjs/operators';

// TODO a11y Announcer

@Component({
  selector: 'app-form-errors',
  templateUrl: './form-errors.component.html',
  styleUrls: ['./form-errors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [formErrorsAnimations]
})
export class FormErrorsComponent implements OnDestroy {
  private autoClose = 5000; // ms until close
  errors$: Observable<string[] | undefined>;
  private sub: Subscription;

  @Input()
  set formName(name: string) {
    this.errors$ = this.facade.selectForm(name).pipe(map(form => form?.errors));
  }

  @Output() dismiss = new EventEmitter<void>();

  constructor(private facade: PrivateDynamicFormFacade) {
    this.sub = timer(this.autoClose)
      .pipe(first())
      .subscribe(() => {
        this.dismiss.emit();
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
