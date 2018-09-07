import { Component } from '@angular/core';

@Component({
  selector: 'bootstrap',
  template: '<router-outlet></router-outlet>',
  styles: [':host{display:block;min-height:100%;width:100%;}'],
})
export class BootstrapComponent {
}
