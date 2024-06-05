import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './view/header/header.component';
import { ContentComponent } from './view/content/content.component';
import { NavComponent } from './view/nav/nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet, HeaderComponent, ContentComponent, NavComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title: any = 'cardinal_toe_app';
  
}
