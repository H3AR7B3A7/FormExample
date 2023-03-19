import { Pipe, PipeTransform } from '@angular/core'
import { FormControlStatus } from '@angular/forms'

@Pipe({
  name: 'status',
})
export class StatusPipe implements PipeTransform {
  transform(value: FormControlStatus): string {
    return value === 'PENDING' ? 'Checking...' : ''
  }
}
