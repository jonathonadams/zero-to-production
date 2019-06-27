import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { take, filter } from 'rxjs/operators';
import { User } from '@workspace/shared/data';
import { AuthUserFacade } from '@workspace/frontend/data-access/user-auth';
import { UsersFacade } from '@workspace/frontend/data-access/users';
import { ThemeService } from '@workspace/frontend/common/theme';

// TODO -> Can Deactivate Guard -> Reset User Settings

@Component({
  selector: 'todo-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileComponent implements OnDestroy {
  public profileForm: FormGroup;
  public user$: Observable<User | undefined>;
  private subscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private authFacade: AuthUserFacade,
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

    this.user$ = this.authFacade.authUser$;

    (this.user$ as Observable<User>)
      .pipe(
        filter(val => val !== undefined),
        take(1)
      )
      .subscribe(user => {
        this.profileForm.reset({
          ...user,
          settings: user.settings.colors
        });
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
      (this.user$ as Observable<User>).pipe(take(1)).subscribe(user => {
        const userSettings = { ...user.settings, colors: value.settings };
        const userToSave = {
          ...user,
          ...value,
          settings: userSettings
        } as User;
        this.userFacade.updateUser(userToSave);
      });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
