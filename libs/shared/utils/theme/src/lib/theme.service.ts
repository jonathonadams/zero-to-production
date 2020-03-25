import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  storageKey = 'theme-settings';

  private darkTheme = new BehaviorSubject<boolean>(false);
  public darkTheme$: Observable<boolean> = this.darkTheme.asObservable();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document
  ) {
    // overlayContainer: OverlayContainer
    // this.subscription = this.darkTheme$.subscribe(active => {
    //   active
    //     ? overlayContainer.getContainerElement().classList.add('dark-theme')
    //     : overlayContainer.getContainerElement().classList.remove('dark-theme');
    // });
  }

  setThemeColors(colors: any): void {
    this.applyColors(colors);
    this.setThemeSettings(colors);
  }

  private applyColors({
    lightPrimary = null,
    lightAccent = null,
    darkPrimary = null,
    darkAccent = null,
  } = {}) {
    const rootElement = this.document.querySelector(':root') as HTMLElement;

    rootElement.style.setProperty('--light-primary-color', lightPrimary);
    rootElement.style.setProperty('--light-accent-color', lightAccent);
    rootElement.style.setProperty('--dark-primary-color', darkPrimary);
    rootElement.style.setProperty('--dark-accent-color', darkAccent);
  }

  private setThemeSettings(theme: { [key: string]: string | boolean }) {
    const savedTheme = this.themeSettings;
    const newTheme = savedTheme ? { ...savedTheme, ...theme } : theme;
    localStorage.setItem(this.storageKey, JSON.stringify(newTheme));
  }

  loadAndApplyColors() {
    if (isPlatformBrowser(this.platformId)) {
      const theme = this.themeSettings;
      if (theme) {
        const { darkMode } = theme;
        this.darkTheme.next(darkMode as boolean);
        this.applyColors(theme);
      }
    }
  }

  get themeSettings(): { [key: string]: string | boolean } | null {
    const theme = localStorage.getItem(this.storageKey);
    return theme ? JSON.parse(theme) : null;
  }

  setDarkThemeStatus(darkMode: boolean): void {
    this.darkTheme.next(darkMode);
    this.setThemeSettings({ darkMode });
  }
}

export function themeProviderFactory(service: ThemeService) {
  return () => service.loadAndApplyColors();
}
