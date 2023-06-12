import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  links = [
    { name: 'Home', path: '' },
    { name: 'About', path: 'about' },
    { name: 'Contact', path: 'contact' },
    { name: 'Dashboard', path: 'dashboard' },
  ];
}
