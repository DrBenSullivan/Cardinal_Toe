import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'spaced',
  standalone: true
})
export class SpacedPipe implements PipeTransform {

  transform(text: string): string {
    if (!text) return text
    return text.replace(/_/g, ' ')
  }

}
