import { Injectable, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';

// Only want one instance of the theme service
@Injectable({ providedIn: 'root' })
export class ThemeService implements OnDestroy {
  storageKey = 'theme-settings';
  /**
   * Use a behavior subject as the state needs to be emitted
   * when a components subscribes to it
   */
  private darkTheme = new BehaviorSubject<boolean>(false);
  public darkTheme$: Observable<boolean> = this.darkTheme.asObservable();

  private subscription: Subscription;

  constructor(
    @Inject(PLATFORM_ID) private platform: Object,
    @Inject(DOCUMENT) private document: Document
  ) {
    /**
     * listen to the changes of the theme service and add
     * the dark-theme to the body element so it sits above all elements
     */
    this.subscription = this.darkTheme$.subscribe(active => {
      const body = this.document.querySelector('body') as HTMLElement;
      active
        ? body.classList.add('dark-theme')
        : body.classList.remove('dark-theme');
    });

    // overlayContainer: OverlayContainer
    // this.subscription = this.darkTheme$.subscribe(active => {
    //   active
    //     ? overlayContainer.getContainerElement().classList.add('dark-theme')
    //     : overlayContainer.getContainerElement().classList.remove('dark-theme');
    // });
  }

  setThemeColors(colors: any): void {
    this.applyColors(colors);
    this.saveColorsToLocalStorage(colors);
  }

  private applyColors({
    lightPrimary = null,
    lightAccent = null,
    darkPrimary = null,
    darkAccent = null
  }) {
    const rootElement = this.document.querySelector(':root') as HTMLElement;

    rootElement.style.setProperty('--light-primary-color', lightPrimary);
    rootElement.style.setProperty('--light-accent-color', lightAccent);
    rootElement.style.setProperty('--dark-primary-color', darkPrimary);
    rootElement.style.setProperty('--dark-accent-color', darkAccent);
  }

  private saveColorsToLocalStorage(colors: any) {
    localStorage.setItem(this.storageKey, JSON.stringify(colors));
  }

  loadAndApplyColors() {
    if (isPlatformBrowser(this.platform)) {
      const colors: any = localStorage.getItem(this.storageKey);
      if (colors) this.applyColors(JSON.parse(colors));
    }
  }

  setDarkThemeStatus(active: boolean): void {
    this.darkTheme.next(active);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

export function themeProviderFactory(service: ThemeService) {
  return () => service.loadAndApplyColors();
}
