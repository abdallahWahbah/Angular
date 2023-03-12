import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false, 
  // if you filtered with something and clicked on add server, 
  // the server will be added but will not appear if it is with the filtered items 
  // unless you delete the filter and write the filter again, 
  // so we force the pipe to be recalculated  
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, propName: string){
    if(value.length === 0 || filterString === "") return value;

    const resultArray = [];
    for(const item of value)
    {
      if(item[propName] === filterString) resultArray.push(item);
    }
    return resultArray;
  }

}
