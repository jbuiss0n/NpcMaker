import { Pipe, PipeTransform } from '@angular/core';

interface IItem {
  Name: string;
}

@Pipe({
  name: 'filter',
  pure: false,
})
export class FilterPipe implements PipeTransform {
  transform(items: IItem[], name: string): any {
    if (!items || !name) {
      return items;
    }

    return items.filter(item => item.Name.toLowerCase().startsWith(name.toLowerCase()));
  }
}
