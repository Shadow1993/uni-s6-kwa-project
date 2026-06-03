import { Pipe, PipeTransform } from '@angular/core';
import { priorityReferences, statusReferences } from 'app/models/reference-model';

@Pipe({
  name: 'reference',
})
export class ReferencePipe implements PipeTransform {
  transform(value: number, reference: string): string {
    switch (reference) {
      case 'status':
        return statusReferences.find((r) => r.id === value)?.label ?? '';
      case 'priority':
        return priorityReferences.find((r) => r.id === value)?.label ?? '';
    }
    return '';
  }
}
