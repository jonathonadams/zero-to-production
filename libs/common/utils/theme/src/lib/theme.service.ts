import {
  Injectable,
  Inject,
  PLATFORM_ID,
  OnDestroy,
  RendererFactory2,
  Renderer2,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Observable, BehaviorSubject, Subscription, combineLatest } from 'rxjs';

interface IThemeSettings {
  darkMode?: boolean;
  lightPrimary?: string | null;
  lightAccent?: string | null;
  darkPrimary?: string | null;
  darkAccent?: string | null;
}

@Injectable({ providedIn: 'root' })
export class ThemeService implements OnDestroy {
  private mql: MediaQueryList | undefined | null;
  private mqlListener: ((mql: MediaQueryListEvent) => void) | null;
  private sub: Subscription;
  private _renderer: Renderer2;
  private head: HTMLElement;
  storageKey = 'theme-settings';

  private darkMode: BehaviorSubject<boolean>;
  public darkMode$: Observable<boolean>;

  private _mainTheme$: BehaviorSubject<string> = new BehaviorSubject(
    'theme-default'
  );

  private themeLinks: HTMLElement[] = [];

  theme$: Observable<[string, boolean]>;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document,
    rendererFactory: RendererFactory2,
    overlayContainer: OverlayContainer
  ) {
    let setDarkMode = false;
    if (isPlatformBrowser(this.platformId) && window.matchMedia) {
      // The 'matches' property will return true if the the user prefers dark mode
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
      // console.log(prefersDarkMode);
      // If the user prefers dark mode then set to true
      setDarkMode = prefersDarkMode.matches;
      this.mql = prefersDarkMode;

      /* Register for future events */
      this.mqlListener = (mq) => {
        this.setDarkThemeStatus(mq.matches);
      };

      if (this.mql.addEventListener as any) {
        this.mql.addEventListener('change', this.mqlListener);
      } else {
        this.mql.addListener(this.mqlListener);
      }
    }

    this.darkMode = new BehaviorSubject<boolean>(setDarkMode);
    this.darkMode$ = this.darkMode.asObservable();

    this._renderer = rendererFactory.createRenderer(null, null);
    this.head = this.document.head;

    this.theme$ = combineLatest([this._mainTheme$, this.darkMode$]);
    this.sub = this.theme$.subscribe(async ([mainTheme, darkMode]) => {
      const cssExt = '.css';
      const cssFilename = darkMode
        ? mainTheme + '-dark' + cssExt
        : mainTheme + cssExt;
      await this.loadCss(cssFilename);
      if (this.themeLinks.length === 2)
        this._renderer.removeChild(this.head, this.themeLinks.shift());
    });

    this.sub.add(
      this.darkMode$.subscribe((active) => {
        active
          ? overlayContainer.getContainerElement().classList.add('dark-theme')
          : overlayContainer
              .getContainerElement()
              .classList.remove('dark-theme');
      })
    );
  }

  get defaultTheme() {
    return {
      lightPrimary: '#ffaa00',
      lightAccent: '#0047B3',
      darkPrimary: '#d33685',
      darkAccent: '#20eff0',
    };
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
  }: IThemeSettings = {}) {
    const rootElement = this.document.querySelector(':root') as HTMLElement;

    rootElement.style.setProperty('--light-primary-color', lightPrimary);
    rootElement.style.setProperty('--light-accent-color', lightAccent);
    rootElement.style.setProperty('--dark-primary-color', darkPrimary);
    rootElement.style.setProperty('--dark-accent-color', darkAccent);
  }

  private setThemeSettings(theme: { [key: string]: string | boolean }) {
    const savedTheme = this.themeSettings;
    const newTheme = savedTheme
      ? { ...savedTheme, ...theme }
      : { ...this.defaultTheme, ...theme };
    localStorage.setItem(this.storageKey, JSON.stringify(newTheme));
  }

  loadAndApplyColors() {
    if (isPlatformBrowser(this.platformId)) {
      const theme = this.themeSettings;
      if (theme) {
        const { darkMode } = theme;
        if (darkMode !== undefined) this.setDarkThemeStatus(darkMode);
        this.applyColors(theme);
      }
    }
  }

  get themeSettings(): IThemeSettings {
    const theme = localStorage.getItem(this.storageKey);
    return theme ? JSON.parse(theme) : null;
  }

  setDarkThemeStatus(darkMode: boolean): void {
    this.darkMode.next(darkMode);
    this.setThemeSettings({ darkMode });
  }

  private async loadCss(filename: string) {
    return new Promise((resolve) => {
      const linkEl: HTMLElement = this._renderer.createElement('link');
      this._renderer.setAttribute(linkEl, 'rel', 'stylesheet');
      this._renderer.setAttribute(linkEl, 'type', 'text/css');
      this._renderer.setAttribute(linkEl, 'href', filename);
      this._renderer.setProperty(linkEl, 'onload', resolve);
      this._renderer.appendChild(this.head, linkEl);
      this.themeLinks = [...this.themeLinks, linkEl];
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    if (this.mql && this.mqlListener) {
      if (this.mql.removeEventListener) {
        this.mql.removeEventListener('change', this.mqlListener);
      } else {
        this.mql.removeListener(this.mqlListener);
      }

      this.mql = this.mqlListener = null;
    }
  }
}

export function themeProviderFactory(service: ThemeService) {
  return () => service.loadAndApplyColors();
}
