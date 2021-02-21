import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'data'
})
export class DataPipe implements PipeTransform {

  transform(value, ...args: unknown[]): unknown {
    let dia = value.split('-')[2].replace('T03:00:00.000Z','');
    let mes = value.split('-')[1];
    const ano = value.split('-')[0];

    return `${dia}/${mes}/${ano}`

  }

}
