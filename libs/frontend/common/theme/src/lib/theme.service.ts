import { Injectable, OnDestroy, Inject } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { OverlayContainer } from '@angular/cdk/overlay';
import { filter, distinctUntilChanged } from 'rxjs/operators';
// import { AuthUsersFacade } from 'libs/common/data-access/user-auth/src/lib/services/users.facade';
import { DOCUMENT } from '@angular/common';

// TODO -> Abstract this away from users

@Injectable()
export class ThemeService implements OnDestroy {
  /**
   * Use a behavior subject as the state needs to be emitted
   * when a components subscribes to it
   */
  private darkTheme = new BehaviorSubject<boolean>(false);
  public darkTheme$: Observable<boolean> = this.darkTheme.asObservable();

  private subscription: Subscription;
  // private userSubscription: Subscription;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    overlayContainer: OverlayContainer
    // private facade: AuthUsersFacade
  ) {
    /**
     * listen to the changes of the theme service and add
     * the dark-theme to the global overlay element
     */
    this.subscription = this.darkTheme$.subscribe(active => {
      active
        ? overlayContainer.getContainerElement().classList.add('dark-theme')
        : overlayContainer.getContainerElement().classList.remove('dark-theme');
    });

    // this.userSubscription = this.facade.authUser$
    //   .pipe(
    //     filter(user => user !== undefined),
    //     distinctUntilChanged()
    //   )
    //   .subscribe(user => this.darkTheme.next(user.settings.darkMode));
  }

  public setThemeColors({
    lightPrimary,
    lightAccent,
    darkPrimary,
    darkAccent
  }: {
    lightPrimary: string;
    lightAccent: string;
    darkPrimary: string;
    darkAccent: string;
  }): void {
    const rootElement = this.document.querySelector(':root') as HTMLElement;
    rootElement.style.setProperty('--light-primary-color', lightPrimary);
    rootElement.style.setProperty('--light-accent-color', lightAccent);
    rootElement.style.setProperty('--dark-primary-color', darkPrimary);
    rootElement.style.setProperty('--dark-accent-color', darkAccent);
  }

  setDarkThemeStatus(active: boolean): void {
    this.darkTheme.next(active);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    // this.userSubscription.unsubscribe();
  }
}
