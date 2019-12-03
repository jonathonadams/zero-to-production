import {
  Component,
  ChangeDetectionStrategy,
  AfterViewChecked
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ThemeService } from '@uqt/common/theme';
import { HighlightService } from '@uqt/examples';

@Component({
  selector: 'ex-css-theming',
  templateUrl: './css-theming.component.html',
  styleUrls: ['./css-theming.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CssThemingComponent implements AfterViewChecked {
  form: FormGroup;
  constructor(
    fb: FormBuilder,
    private themeService: ThemeService,
    private highlightService: HighlightService
  ) {
    this.form = fb.group({
      lightPrimary: ['#7b1fa2'],
      lightAccent: ['#f0820f'],
      darkPrimary: ['#20eff0'],
      darkAccent: ['#d33685']
    });

    this.form.valueChanges.subscribe(themeSettings => {
      this.themeService.setThemeColors(themeSettings);
    });
  }

  css = `// define css variables
  :root {
    --light-primary-color: #7b1fa2;
    --light-accent-color: #f0820f;
    --dark-primary-color: #20eff0;
    --dark-accent-color: #d33685;
  }

  // material theme pallet
  $light-primary-pallet: (
    ...
    400: #ff7043,
    500: var(--light-primary-color),
    600: #ff4f1e,
    ...
  );`;

  ts = `// theme.service.ts
  constructor(@Inject(DOCUMENT) private document: Document) {}

  ...
  setThemeColors({
    lightPrimary = null,
    lightAccent = null,
    darkPrimary = null,
    darkAccent = null
  }): void {
    const rootElement = this.document.querySelector(':root') as HTMLElement;

    rootElement.style.setProperty('--light-primary-color', lightPrimary);
    rootElement.style.setProperty('--light-accent-color', lightAccent);
    rootElement.style.setProperty('--dark-primary-color', darkPrimary);
    rootElement.style.setProperty('--dark-accent-color', darkAccent);
  }`;

  ngAfterViewChecked() {
    this.highlightService.highlightAll();
  }
}
