import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrismHighlighter } from './highlighter/highlighter.component';
import { PrismTokenizer } from './tokenizer/tokenizer.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PrismHighlighter, PrismTokenizer],
  exports: [PrismHighlighter, PrismTokenizer]
})
export class PrismModule {}
