import { Injectable, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { filter, distinctUntilChanged } from 'rxjs/operators';
import { AuthUserFacade } from '@workspace/frontend/data-access/user-auth';
import { User } from '@workspace/shared/data';

@Injectable()
export class ThemeService implements OnDestroy {
  /**
   * Use a behavior subject as the state needs to be emitted
   * when a components subscribes to it
   */
  private darkTheme = new BehaviorSubject<boolean>(false);
  public darkTheme$: Observable<boolean> = this.darkTheme.asObservable();

  private subscription: Subscription;
  private userSubscription: Subscription;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    overlayContainer: OverlayContainer,
    private facade: AuthUserFacade
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

    this.userSubscription = (this.facade.authUser$ as Observable<User>)
      .pipe(
        filter(user => user !== undefined),
        distinctUntilChanged()
      )
      .subscribe(user => {
        this.darkTheme.next(user.settings.darkMode);
        this.setThemeColors(user.settings.colors);
      });
  }

  public setThemeColors({
    lightPrimary = '',
    lightAccent = '',
    darkPrimary = '',
    darkAccent = ''
  } = {}): void {
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
    this.userSubscription.unsubscribe();
  }
}
