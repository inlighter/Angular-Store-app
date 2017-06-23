import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <nav-bar></nav-bar>
  <div class="container">
  </div>
  <router-outlet></router-outlet>
  
  
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}
