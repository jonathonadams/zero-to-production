import { Injectable } from '@angular/core';
import {
  AsyncValidator,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import { map, catchError, tap, switchMap, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { AuthFacade } from '../+state/auth.facade';

@Injectable({ providedIn: 'root' })
export class UsernameAvailableValidator implements AsyncValidator {
  constructor(private auth: AuthService, private facade: AuthFacade) {}

  validate(ctrl: AbstractControl): Observable<ValidationErrors | null> {
    // Don't need to worry about using takeUntil(ctrl.valueChanges)
    // because the form unsubscribes when the ctrl value changes

    return timer(200).pipe(
      take(1),
      tap(() =>
        ctrl.value
          ? this.facade.usernamePending()
          : this.facade.clearAvailable()
      ),
      switchMap(val => this.auth.isUsernameAvailable(ctrl.value)),
      map(
        mutationResponse =>
          (mutationResponse.data as {
            usernameAvailable: { isAvailable: boolean };
          }).usernameAvailable
      ),
      tap(available => this.facade.usernameAvailable(available)), // set the available status
      map(({ isAvailable }) => (isAvailable ? null : { notAvailable: true })),
      catchError((e: any) => of(null))
    );
  }
}
