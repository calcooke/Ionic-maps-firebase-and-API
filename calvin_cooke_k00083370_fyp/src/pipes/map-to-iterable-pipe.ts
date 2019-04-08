import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'mapToIterable'
})
export class MapToIterable implements PipeTransform {
  transform(dict: Object) {
    var a = [];
    for (var key in dict) {
      if (dict.hasOwnProperty(key)) {
        a.push({key: key, val: dict[key]});
      }
    }
    return a;
  }
}


// Tried and failed to implement a custom pipe to solve an observable problem.

