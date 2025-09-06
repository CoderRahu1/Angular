import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

// removed unnecessary method 

transform(items:any[], searchText:string): any[] {
  if(!items || !searchText ) {
    return items; 
  } 
  return items.filter((item) => {
    return item.toLowerCase().includes(searchText.toLowerCase());
  })
 
};
}
