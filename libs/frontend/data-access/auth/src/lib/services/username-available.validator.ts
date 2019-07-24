import { Injectable } from '@angular/core';
import {
  AsyncValidator,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { AuthFacade } from '../+state/auth.facade';

@Injectable()
export class UsernameAvailableValidator implements AsyncValidator {
  constructor(private auth: AuthService, private facade: AuthFacade) {}

  validate(ctrl: AbstractControl): Observable<ValidationErrors | null> {
    // Set to pending each request
    this.facade.usernamePending();

    return this.auth.isUsernameAvailable(ctrl.value).pipe(
      map(response => response.isAvailable),
      tap(available =>
        // Set to available or not
        available
          ? this.facade.usernameAvailable()
          : this.facade.usernameUnAvailable()
      ),
      map(available => (available ? null : { notAvailable: true })),
      catchError(() => of(null))
    );
  }
}
