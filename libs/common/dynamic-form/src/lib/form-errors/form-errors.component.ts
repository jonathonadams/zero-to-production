import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
  ViewChild,
  HostListener,
} from '@angular/core';
import { Observable } from 'rxjs';
import { formErrorsAnimations } from './form-errors.animations';
import { PrivateDynamicFormFacade } from '../+state/private-dynamic-form.facade';
import { map, tap } from 'rxjs/operators';
import { MatButton } from '@angular/material/button';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-form-errors',
  templateUrl: './form-errors.component.html',
  styleUrls: ['./form-errors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [formErrorsAnimations],
})
export class FormErrorsComponent {
  errors$: Observable<string[]>;

  @Output() dismiss = new EventEmitter<void>();
  @ViewChild('dismissButton', { static: true }) button: MatButton;

  @HostListener('window:keyup', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.dismiss.emit();
    }
  }

  @Input()
  set formName(name: string) {
    this.errors$ = this.facade.selectForm(name).pipe(
      map((form) => form?.errors as string[]),
      tap((errors) => this.announceErrors(name, errors))
    );
  }

  constructor(
    private liveAnnouncer: LiveAnnouncer,
    private facade: PrivateDynamicFormFacade
  ) {}

  announceErrors(formName: string, errors: string[]) {
    const message =
      `The ${formName} form has ${errors.length} errors. ` + errors.join(', ');
    this.liveAnnouncer.announce(message, 'polite');
  }

  onAnimationEvent(event: any) {
    this.button.focus();
  }
}
