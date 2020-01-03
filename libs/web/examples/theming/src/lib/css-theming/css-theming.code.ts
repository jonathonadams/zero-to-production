export const css = `// define css variables
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

export const ts = `// theme.service.ts
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
