import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'limitText'})
export class LimitTextPipe implements PipeTransform {
  transform(text: string, limit: number, truncateText?: string): any {
      if(!text || text.length <= limit){
          return text;
      } else {
        return text.substring(0, limit) + (truncateText || "");
      }
  }
}
