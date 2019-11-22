import { Component, Input } from '@angular/core';

import 'prismjs';
import 'prismjs/plugins/toolbar/prism-toolbar';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-sass';
import 'prismjs/components/prism-scss';

declare const Prism: any;

export interface Token {
  type: string;
  content: string | Token[];
}

@Component({
  selector: ':not(pre)[wm-prism]',
  templateUrl: './tokenizer.component.html'
})
export class PrismTokenizer {
  public tokens: (string | Token)[] | undefined;
  private grammar: any;

  /** Selects the most appropriate grammar according to the language */
  @Input() set language(language: string) {
    this.grammar = !!language ? Prism.languages[language] : undefined;
  }

  /** Tokenizes the input string or pass along the already tokenized array */
  @Input('wm-prism') set highlight(source: string | Token[]) {
    console.log(source);
    console.log(typeof source);
    this.tokens = typeof source === 'string' ? this.tokenize(source) : source;
    console.log(this.tokens);
  }

  /** Helper for rendering strings */
  isString(token: string | Token): boolean {
    return typeof token === 'string';
  }

  private tokenize(source: string): (string | Token)[] {
    // Skips invalid source
    if (!source) {
      return [''];
    }
    // Returns the full text as a single token when no grammar is defined
    if (!this.grammar) {
      return [source];
    }

    console.log('$$$$$$$$$$$$$');
    console.log(this.grammar);
    console.log(source);
    // Tokenize the source code according to the selected grammar
    return Prism.tokenize(source, this.grammar);
  }
}
