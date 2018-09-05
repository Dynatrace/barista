import { DtRateUnit, DtUnit } from '../unit';
import { DtFormattedValue } from '../formatted-value';
import { Pipe, PipeTransform } from '@angular/core';
import { KILO_MULTIPLIER } from '../number-formatter';
import { formatBytes } from './bytes-formatter';

/**
 * Pipe for formatting a given number to Megabytes
 */
@Pipe({
  name: 'dtMegabytes',
})
export class DtMegabytes implements PipeTransform {
  /**
   * @param input - The number to be formatted as Megabytes
   * @param factor - The factor used to divide the number for decimal prefixes. Default is 1000
   * @param inputUnit - The unit for the input number. Default is DtUnit.BYTES
   */
  transform(
    input: DtFormattedValue | number,
    factor: number = KILO_MULTIPLIER,
    inputUnit: DtUnit = DtUnit.BYTES
  ): DtFormattedValue {
    return formatBytes(input, { factor, inputUnit, outputUnit: DtUnit.MEGA_BYTES });
  }
}
