import { Component, Input, ViewEncapsulation } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'pre[wm-prism]',
  templateUrl: './highlighter.component.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'wm-prism',
    '[class.language-none]': '!disabled'
  }
})
/** Perform code highlighting by processing an input text to be rendered into an angular template
 * Using prism as tokenizer @see {https://github.com/PrismJS/prism} */
export class PrismHighlighter {
  /** Disables the highlighting */
  @Input('disabled') set disableHighlight(value: boolean) {
    this.disabled = coerceBooleanProperty(value);
  }
  public disabled = false;

  /** Selects the language */
  @Input() language: string | undefined;

  /** Parses the source text */
  @Input('wm-prism') source: string | undefined;
}
