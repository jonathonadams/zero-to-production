import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  DynamicFormFacade,
  TFormGroups,
  FormGroupTypes,
  FormFieldTypes
} from '@uqt/data-access/dynamic-form';
import { ThemeService } from '@uqt/common/theme';
import { HighlightService } from '@uqt/examples';

export const THEME_GROUP: TFormGroups = [
  {
    formGroup: 'themeSettings',
    groupType: FormGroupTypes.Group,
    fields: [
      {
        componentType: FormFieldTypes.Input,
        type: 'color',
        name: 'lightPrimary',
        label: 'Light Mode - Primary Colour',
        initialValue: '#7b1fa2'
      },
      {
        componentType: FormFieldTypes.Input,
        type: 'color',
        name: 'lightAccent',
        label: 'Light Mode - Accent Colour',
        initialValue: '#f0820f'
      },
      {
        componentType: FormFieldTypes.Input,
        type: 'color',
        name: 'darkPrimary',
        label: 'Dark Mode - Primary Colour',
        initialValue: '#20eff0'
      },
      {
        componentType: FormFieldTypes.Input,
        type: 'color',
        name: 'darkAccent',
        label: 'Dark Mode - Accent Colour',
        initialValue: '#d33685'
      }
    ]
  }
];

@Component({
  selector: 'ex-css-theming',
  templateUrl: './css-theming.component.html',
  styleUrls: ['./css-theming.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CssThemingComponent implements OnInit {
  constructor(
    private formsFacade: DynamicFormFacade,
    private themeService: ThemeService,
    private highlightService: HighlightService
  ) {
    this.formsFacade.data$.subscribe(({ themeSettings }) => {
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
  const rootElement = this.document.querySelector(':root') as HTMLElement;
  rootElement.style.setProperty('--light-primary-color', lightPrimary);
  rootElement.style.setProperty('--light-accent-color', lightAccent);
  rootElement.style.setProperty('--dark-primary-color', darkPrimary);
  rootElement.style.setProperty('--dark-accent-color', darkAccent);`;

  ngOnInit() {
    this.highlightService.highlightAll();
    this.formsFacade.setStructure({ structure: THEME_GROUP });
  }
}
