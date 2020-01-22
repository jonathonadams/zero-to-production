import {
  Component,
  ChangeDetectionStrategy,
  AfterViewInit
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ThemeService } from '@uqt/common/theme';
import { CodeHighlightService } from '@uqt/web/examples/code-highlight';
import { css, ts, appInit } from './css-theming.code';

@Component({
  selector: 'ex-css-theming',
  templateUrl: './css-theming.component.html',
  styleUrls: ['./css-theming.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CssThemingComponent implements AfterViewInit {
  form: FormGroup;

  css = css;
  ts = ts;
  appInit = appInit;

  constructor(
    private fb: FormBuilder,
    private themeService: ThemeService,
    private highlightService: CodeHighlightService
  ) {
    this.form = this.fb.group({
      lightPrimary: ['#7b1fa2'],
      lightAccent: ['#f0820f'],
      darkPrimary: ['#20eff0'],
      darkAccent: ['#d33685']
    });

    this.form.valueChanges.subscribe(themeSettings => {
      this.themeService.setThemeColors(themeSettings);
    });
  }

  resetTheme() {
    this.form.reset({
      lightPrimary: '#7b1fa2',
      lightAccent: '#f0820f',
      darkPrimary: '#20eff0',
      darkAccent: '#d33685'
    });
  }

  ngAfterViewInit() {
    this.highlightService.highlightAll();
  }
}
