import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minsToHours',
})
export class MinsToHoursPipe implements PipeTransform {
  transform(value: number): number {
    return Math.floor(value / 60);
  }
}
