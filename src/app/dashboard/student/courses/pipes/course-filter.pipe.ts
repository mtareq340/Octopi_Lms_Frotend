import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'courseFilter'
})
export class CourseFilterPipe implements PipeTransform {

  transform(items: any[], request: string): any[] {
    if (!items || !request) {
      return items;
    }
    return items.filter(item => {
      const itemName = item.course.name ? item.course.name.toLowerCase() : '';
      const itemCode = item.course.code ? item.course.code.toLowerCase() : '';
      return itemName.includes(request.toLowerCase()) || itemCode.includes(request.toLowerCase());
    });
  }

}
