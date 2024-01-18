import { Directive } from '@angular/core';

@Directive({
  selector: '[appEmailNotExists]',
  standalone: true
})
export class EmailNotExistsDirective {

  constructor() { }

}
