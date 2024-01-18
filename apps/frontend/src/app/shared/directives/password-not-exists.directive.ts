import { Directive } from '@angular/core';

@Directive({
  selector: '[appPasswordNotExists]',
  standalone: true
})
export class PasswordNotExistsDirective {

  constructor() { }

}
