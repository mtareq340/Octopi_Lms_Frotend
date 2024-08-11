import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'resultFilter'
})
export class ResultFilterPipe implements PipeTransform {

  transform(items: any[], request: string): any[] {
    if (!items || !request) {
      return items;
    }
    return items.filter(item => {
      const itemName = item.course.name ? item.course.name.toLowerCase() : '';
      return itemName.includes(request.toLowerCase());
    });
  }

}
