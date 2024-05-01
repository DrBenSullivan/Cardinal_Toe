import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paragraph',
  standalone: true
})
export class ParagraphPipe implements PipeTransform {

  transform(text: string | null | undefined) {
    if(text) {
      return text.split(`. `).join(`. \n`);
    }
    console.error(`ParagraphPipe applied to non-string variable`);
    return text;
  }

}
