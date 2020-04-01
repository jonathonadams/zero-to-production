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

@Injectable({ providedIn: 'root' })
export class ThemeService implements OnDestroy {
  private sub: Subscription;
  private _renderer: Renderer2;
  private head: HTMLElement;
  storageKey = 'theme-settings';

  private darkMode = new BehaviorSubject<boolean>(false);
  public darkMode$: Observable<boolean> = this.darkMode.asObservable();

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
    this._renderer = rendererFactory.createRenderer(null, null);
    this.head = this.document.head;
    this.theme$ = combineLatest([this._mainTheme$, this.darkMode$]);
    this.theme$.subscribe(async ([mainTheme, darkMode]) => {
      const cssExt = '.css';
      const cssFilename = darkMode
        ? mainTheme + '-dark' + cssExt
        : mainTheme + cssExt;
      await this.loadCss(cssFilename);
      if (this.themeLinks.length === 2)
        this._renderer.removeChild(this.head, this.themeLinks.shift());
    });

    this.sub = this.darkMode$.subscribe((active) => {
      active
        ? overlayContainer.getContainerElement().classList.add('dark-theme')
        : overlayContainer.getContainerElement().classList.remove('dark-theme');
    });
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
        this.darkMode.next(darkMode as boolean);
        this.applyColors(theme);
      }
    }
  }

  get themeSettings(): { [key: string]: string | boolean } | null {
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
  }
}

export function themeProviderFactory(service: ThemeService) {
  return () => service.loadAndApplyColors();
}
