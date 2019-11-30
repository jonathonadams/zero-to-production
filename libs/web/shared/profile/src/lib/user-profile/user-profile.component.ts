import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { take, filter } from 'rxjs/operators';
import { IUser } from '@ngw/types';
import { UsersFacade } from '@ngw/data-access/users';
import { ThemeService } from '@ngw/common/theme';

// TODO -> Can Deactivate Guard -> Reset User Settings
// TODO -> Theme / Language settings to be stored in local storage

@Component({
  selector: 'ngw-user-profile',
  templateUrl: './user-profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileComponent implements OnDestroy {
  public profileForm: FormGroup;
  public user$: Observable<IUser | undefined>;
  private subscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private userFacade: UsersFacade,
    private themeService: ThemeService
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailAddress: [
        '',
        Validators.compose([Validators.required, Validators.email])
      ],
      settings: fb.group({
        lightPrimary: ['#000000'],
        lightAccent: ['#000000'],
        darkPrimary: ['#000000'],
        darkAccent: ['#000000']
      })
    });

    this.user$ = this.userFacade.authUser$;

    (this.user$ as Observable<IUser>)
      .pipe(
        filter(val => val !== undefined),
        take(1)
      )
      .subscribe(user => {
        this.profileForm.reset(user);
      });

    /**
     * Listen to the change in values of the form so you can update the theme colors in real-time
     */
    this.subscription = this.profileForm.valueChanges.subscribe(value => {
      this.themeService.setThemeColors(value.settings);
    });
  }

  onSubmit({ valid, value }: FormGroup) {
    if (valid) {
      (this.user$ as Observable<IUser>).pipe(take(1)).subscribe(user => {
        const userToSave = {
          ...user,
          ...value
        } as IUser;
        this.userFacade.updateUser(userToSave);
      });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
