import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weight',
})
export class WeightPipe implements PipeTransform {
  transform(value: number, imperical: boolean): string {
    if (imperical) {
      return `${(value * 2.20462).toFixed(1)} lbs`;
    }
    return `${value.toFixed(1)} kgs`;
  }
}
